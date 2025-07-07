package com.obsidian.medical.service;

import com.obsidian.medical.dto.treatment.TreatmentProgressRequestDTO;
import com.obsidian.medical.model.ConsultationModel;
import com.obsidian.medical.model.TreatmentProgressModel;
import com.obsidian.medical.repository.IConsultationRepository;
import com.obsidian.medical.repository.ITreatmentProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TreatmentProgressService {
    private final ITreatmentProgressRepository treatmentProgressRepository;
    private final IConsultationRepository consultationRepository;

    public ResponseEntity<String> saveTreatmentProgress(TreatmentProgressRequestDTO treatmentProgressRequestDTO) {
        Optional<ConsultationModel> consultation = consultationRepository.findById(treatmentProgressRequestDTO.getConsultationId());
        if (consultation.isEmpty()) {
            return ResponseEntity.badRequest().body("No se encontro la consulta");
        }

        TreatmentProgressModel treatmentProgress = new TreatmentProgressModel();

        treatmentProgress.setConsult(consultation.get());
        treatmentProgress.setDate(treatmentProgressRequestDTO.getDate());
        treatmentProgress.setDescription(treatmentProgressRequestDTO.getDetails());

        treatmentProgressRepository.save(treatmentProgress);
        return ResponseEntity.ok().body("TreatmentProgress guardado con exito");
    }
}
