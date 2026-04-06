package com.assurance.sante.connect.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final Map<String, String> tempEmailMapping = new HashMap<>();

    public void sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@assurance-sante-connect.com");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }

    public void storeTempEmailMapping(String tempEmail, String realEmail) {
        tempEmailMapping.put(tempEmail, realEmail);
    }

    public String getRealEmail(String tempEmail) {
        return tempEmailMapping.getOrDefault(tempEmail, tempEmail);
    }

    public void confirmEmail(String tempEmail) {
        tempEmailMapping.remove(tempEmail);
    }
}
