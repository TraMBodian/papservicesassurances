package com.assurance.sante.connect.dto;

import lombok.*;
import com.assurance.sante.connect.entity.Assure;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssureDto {
    private Long id;
    private String numero;
    private String nom;
    private String prenom;
    private String telephone;
    private String email;
    private String statut;
    private String type;
    private String adresse;

    public static AssureDto fromEntity(Assure assure) {
        return AssureDto.builder()
            .id(assure.getId())
            .numero(assure.getNumero())
            .nom(assure.getNom())
            .prenom(assure.getPrenom())
            .telephone(assure.getTelephone())
            .email(assure.getEmail())
            .statut(assure.getStatut().name())
            .type(assure.getType().name())
            .adresse(assure.getAdresse())
            .build();
    }
}
