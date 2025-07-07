package com.obsidian.medical.controller;

import com.obsidian.medical.dto.vitalSgins.VitalSignsRequestDTO;
import com.obsidian.medical.dto.vitalSgins.VitalSignsResponseDTO;
import com.obsidian.medical.service.VitalSignsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vitalsigns")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VitalSignsController {
    private final VitalSignsService vitalSignsService;

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody VitalSignsRequestDTO request) {
        return vitalSignsService.saveVitalSigns(request);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ResponseEntity<List<VitalSignsResponseDTO>> getById(@PathVariable("id") Long id) {
        return vitalSignsService.getVitalSignsByUser(id);
    }



}