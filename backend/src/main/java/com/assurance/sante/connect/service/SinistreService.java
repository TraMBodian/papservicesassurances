package com.assurance.sante.connect.service;

import com.assurance.sante.connect.entity.Sinistre;
import com.assurance.sante.connect.repository.SinistreRepository;
import com.assurance.sante.connect.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SinistreService {

    private final SinistreRepository sinistreRepository;

    public List<Sinistre> getAllSinistres() {
        return sinistreRepository.findAll();
    }

    public Sinistre getSinistreById(Long id) {
        return sinistreRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Sinistre not found with id: " + id));
    }

    public Sinistre createSinistre(Sinistre sinistre) {
        return sinistreRepository.save(sinistre);
    }

    public Sinistre updateSinistre(Long id, Sinistre sinistreDetails) {
        Sinistre sinistre = sinistreRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Sinistre not found with id: " + id));

        if (sinistreDetails.getDescription() != null) sinistre.setDescription(sinistreDetails.getDescription());
        if (sinistreDetails.getMontantReclamation() != null) sinistre.setMontantReclamation(sinistreDetails.getMontantReclamation());
        if (sinistreDetails.getMontantAccorde() != null) sinistre.setMontantAccorde(sinistreDetails.getMontantAccorde());
        if (sinistreDetails.getStatut() != null) sinistre.setStatut(sinistreDetails.getStatut());

        return sinistreRepository.save(sinistre);
    }

    public void deleteSinistre(Long id) {
        Sinistre sinistre = sinistreRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Sinistre not found with id: " + id));
        sinistreRepository.delete(sinistre);
    }
}
