package com.obsidian.medical.controller;

import com.obsidian.medical.auth.AuthResponse;
import com.obsidian.medical.dto.auth.LoginRequestDTO;
import com.obsidian.medical.dto.auth.LogupRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientResponseDTO;
import com.obsidian.medical.dto.expedient.UserWithExpedientDTO;
import com.obsidian.medical.model.ExpedientModel;
import com.obsidian.medical.model.UserModel;
import com.obsidian.medical.service.ExpedientService;
import com.obsidian.medical.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

//    implementation 'org.springframework.boot:spring-boot-starter-web'

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/expedient")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExpedientController {
    private final ExpedientService expedientService;

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public ResponseEntity save(@RequestBody ExpedientRequestDTO request) {
        return expedientService.save(request);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/image")
    public ResponseEntity uploadImage(@RequestParam("file") MultipartFile file) {
        return expedientService.uploadImage(file);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/getexpedient")
    public ExpedientResponseDTO getExpedient(@RequestBody Map<String, Object> body) {
        System.out.println("Buscando expediente");
        String email = (String) body.get("email");
        System.out.println("email" + email);
        if (email == null){
            System.out.println("no se recibieron los valores");
            return null;
        }
//        return new ExpedientResponseDTO();
        return expedientService.getExpedient(email);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("")
    public List<ExpedientResponseDTO> getAll() {
        return expedientService.getAll();
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ExpedientResponseDTO getById(@PathVariable("id") Long id) {
        return expedientService.getById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/userwithexpedient")
    public List<UserWithExpedientDTO> findByNotExpedient() {
        return expedientService.findByNotExpedient();
    }


}
