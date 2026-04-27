package com.assurance.sante.connect.controller;

import com.assurance.sante.connect.entity.Assure;
import com.assurance.sante.connect.repository.AssureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicVerifyController {

    private final AssureRepository assureRepository;

    /**
     * Endpoint public (sans authentification) — retourne uniquement les données
     * minimales nécessaires pour vérifier la validité d'une carte d'assurance.
     * Aucune donnée sensible n'est exposée (téléphone, email, adresse, etc.).
     */
    @GetMapping("/verify/{numero}")
    public ResponseEntity<Map<String, Object>> verify(@PathVariable String numero) {
        Optional<Assure> opt = assureRepository.findByNumero(numero);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of(
                "found", false,
                "message", "Carte introuvable"
            ));
        }

        Assure a = opt.get();

        // Déterminer si la carte est expirée
        boolean expired = false;
        if (a.getDateFin() != null && !a.getDateFin().isBlank()) {
            try {
                LocalDate fin = LocalDate.parse(a.getDateFin());
                expired = fin.isBefore(LocalDate.now());
            } catch (Exception ignored) {}
        }

        String statutEffectif = expired ? "EXPIRÉ"
            : (a.getStatut() != null ? a.getStatut().name() : "ACTIF");

        // Masquer partiellement le nom : "DIALLO Ba..." → vie privée
        String nomMasque = maskName(a.getNom());
        String prenomMasque = maskName(a.getPrenom());

        return ResponseEntity.ok(Map.of(
            "found",     true,
            "numero",    a.getNumero(),
            "nom",       nomMasque,
            "prenom",    prenomMasque,
            "statut",    statutEffectif,
            "actif",     "ACTIF".equals(statutEffectif),
            "dateFin",   a.getDateFin() != null ? a.getDateFin() : "31/12/2026",
            "garantie",  a.getGarantie() != null ? a.getGarantie() : "Standard",
            "type",      a.getType() != null ? a.getType().name() : "FAMILLE"
        ));
    }

    private String maskName(String name) {
        if (name == null || name.length() <= 2) return name;
        // Garde les 3 premiers caractères + "***"
        return name.substring(0, Math.min(3, name.length())) + "***";
    }
}
