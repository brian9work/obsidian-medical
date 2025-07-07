package com.obsidian.medical.controller;

import com.obsidian.medical.dto.consultation.AllConsultationDTO;
import com.obsidian.medical.dto.consultationDate.ConsultationDateRequestDTO;
import com.obsidian.medical.dto.treatment.AddConsultationRequestDTO;
import com.obsidian.medical.service.ConsultationService;
import com.obsidian.medical.service.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/consulta")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ConsultationController {
    private final TreatmentService treatmentService;
    private final ConsultationService consultationService;

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody AddConsultationRequestDTO request) {
        return treatmentService.saveConsultation(request);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ResponseEntity<AllConsultationDTO> save(@PathVariable("id") Long id) {
        return consultationService.getConsultation(id);
    }
}
