package com.assurance.sante.connect.service;

import com.assurance.sante.connect.entity.Police;
import com.assurance.sante.connect.entity.Assure;
import com.assurance.sante.connect.repository.PoliceRepository;
import com.assurance.sante.connect.repository.AssureRepository;
import com.assurance.sante.connect.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PoliceService {

    private final PoliceRepository policeRepository;
    private final AssureRepository assureRepository;

    public List<Police> getAllPolices() {
        return policeRepository.findAll();
    }

    public Police getPoliceById(Long id) {
        return policeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Police not found with id: " + id));
    }

    public Police createPolice(Police police) {
        Assure assure = assureRepository.findById(police.getAssure().getId())
            .orElseThrow(() -> new ResourceNotFoundException("Assure not found"));
        police.setAssure(assure);
        return policeRepository.save(police);
    }

    public Police updatePolice(Long id, Police policeDetails) {
        Police police = policeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Police not found with id: " + id));

        if (policeDetails.getType() != null) police.setType(policeDetails.getType());
        if (policeDetails.getMontantPrime() != null) police.setMontantPrime(policeDetails.getMontantPrime());
        if (policeDetails.getCouverture() != null) police.setCouverture(policeDetails.getCouverture());

        return policeRepository.save(police);
    }

    public void deletePolice(Long id) {
        Police police = policeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Police not found with id: " + id));
        policeRepository.delete(police);
    }
}
