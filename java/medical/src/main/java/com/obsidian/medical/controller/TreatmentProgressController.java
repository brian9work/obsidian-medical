package com.obsidian.medical.controller;

import com.obsidian.medical.dto.treatment.TreatmentProgressRequestDTO;
import com.obsidian.medical.service.TreatmentProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/treatmentprogress")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TreatmentProgressController {
    private final TreatmentProgressService treatmentProgressService;

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody TreatmentProgressRequestDTO request) {
        return treatmentProgressService.saveTreatmentProgress(request);
    }

}
