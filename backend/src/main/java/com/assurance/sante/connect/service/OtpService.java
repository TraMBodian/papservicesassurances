package com.assurance.sante.connect.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final JavaMailSender mailSender;

    private record OtpEntry(String code, LocalDateTime expiresAt) {
        boolean isExpired() { return LocalDateTime.now().isAfter(expiresAt); }
    }

    private final Map<String, OtpEntry> store = new ConcurrentHashMap<>();
    private final SecureRandom rng = new SecureRandom();

    public void sendOtp(String email) {
        String code = String.format("%06d", rng.nextInt(1_000_000));
        store.put(email.toLowerCase(), new OtpEntry(code, LocalDateTime.now().plusMinutes(10)));
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(email);
            msg.setSubject("PSA — Code de réinitialisation");
            msg.setText(
                "Bonjour,\n\n" +
                "Votre code de réinitialisation de mot de passe est :\n\n" +
                "  " + code + "\n\n" +
                "Ce code expire dans 10 minutes.\n\n" +
                "Si vous n'avez pas fait cette demande, ignorez cet email.\n\n" +
                "— Papy Services Assurances"
            );
            mailSender.send(msg);
        } catch (Exception e) {
            // Email non configuré : on log le code pour les tests
            System.out.println("[OTP] Code pour " + email + " : " + code);
        }
    }

    public boolean verifyOtp(String email, String code) {
        OtpEntry entry = store.get(email.toLowerCase());
        if (entry == null || entry.isExpired()) return false;
        return entry.code().equals(code.trim());
    }

    public void invalidate(String email) {
        store.remove(email.toLowerCase());
    }
}
