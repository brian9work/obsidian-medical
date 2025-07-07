package com.obsidian.medical.controller;

import com.obsidian.medical.dto.consultationDate.ConsultationDateForAdminDTO;
import com.obsidian.medical.dto.consultationDate.ConsultationDateRequestDTO;
import com.obsidian.medical.dto.consultationDate.ConsultationDateResponseListDTO;
import com.obsidian.medical.dto.expedient.ExpedientRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientResponseDTO;
import com.obsidian.medical.service.ConsultationDateService;
import com.obsidian.medical.service.ExpedientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultation")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ConsultationDateController {
    private final ConsultationDateService consultationDateService;

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody ConsultationDateRequestDTO request) {
        return consultationDateService.saveConsultationDate(request);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{email}")
    public ResponseEntity<List<ConsultationDateResponseListDTO>>
    getConsultationDateByUser(@PathVariable("email") String email) {
        return consultationDateService.getConsultationDateByUser(email);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/dates/{email}")
    public ResponseEntity<List<ConsultationDateForAdminDTO>>
    getConsultationDateForAdmin(@PathVariable("email") String email) {
        return consultationDateService.getConsultationDateForAdmin(email);
    }


    @CrossOrigin(origins = "*")
    @GetMapping("/getIdUser/{id}")
    public ResponseEntity<String>
    getIdUser(@PathVariable("id") Long id) {
        return consultationDateService.getIdUserByIdConsultationDate(id);
    }

}
