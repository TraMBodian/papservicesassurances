package com.assurance.sante.connect.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consultation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assure_id", nullable = false)
    private Assure assure;

    @ManyToOne
    @JoinColumn(name = "prestataire_id", nullable = false)
    private Prestataire prestataire;

    @Column(columnDefinition = "TEXT")
    private String motif;

    @Column(columnDefinition = "TEXT")
    private String diagnostic;

    @Column(name = "date_consultation")
    private LocalDateTime dateConsultation;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ConsultationStatut statut = ConsultationStatut.COMPLETEE;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum ConsultationStatut {
        PROGRAMMEE,
        COMPLETEE,
        ANNULEE
    }
}
