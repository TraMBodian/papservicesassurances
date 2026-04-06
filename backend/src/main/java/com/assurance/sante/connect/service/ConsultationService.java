package com.assurance.sante.connect.service;

import com.assurance.sante.connect.entity.Consultation;
import com.assurance.sante.connect.repository.ConsultationRepository;
import com.assurance.sante.connect.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final ConsultationRepository consultationRepository;

    public List<Consultation> getAllConsultations() {
        return consultationRepository.findAll();
    }

    public Consultation getConsultationById(Long id) {
        return consultationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Consultation not found with id: " + id));
    }

    public Consultation createConsultation(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    public Consultation updateConsultation(Long id, Consultation consultationDetails) {
        Consultation consultation = consultationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Consultation not found with id: " + id));

        if (consultationDetails.getMotif() != null) consultation.setMotif(consultationDetails.getMotif());
        if (consultationDetails.getDiagnostic() != null) consultation.setDiagnostic(consultationDetails.getDiagnostic());
        if (consultationDetails.getStatut() != null) consultation.setStatut(consultationDetails.getStatut());

        return consultationRepository.save(consultation);
    }

    public void deleteConsultation(Long id) {
        Consultation consultation = consultationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Consultation not found with id: " + id));
        consultationRepository.delete(consultation);
    }
}
