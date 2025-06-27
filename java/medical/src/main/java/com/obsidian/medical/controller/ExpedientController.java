package com.obsidian.medical.controller;

import com.obsidian.medical.auth.AuthResponse;
import com.obsidian.medical.dto.auth.LoginRequestDTO;
import com.obsidian.medical.dto.auth.LogupRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientResponseDTO;
import com.obsidian.medical.model.ExpedientModel;
import com.obsidian.medical.service.ExpedientService;
import com.obsidian.medical.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expedient")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExpedientController {
    private final ExpedientService expedientService;

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public ResponseEntity save(@RequestBody ExpedientRequestDTO request) {
        System.out.println("Entroooooo");
        return expedientService.save(request);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("")
    public List<ExpedientResponseDTO> getAll() {
        return expedientService.getAll();
    }
}

/*
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @CrossOrigin(origins = "*")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/logup")
    public ResponseEntity<AuthResponse> logup(@RequestBody LogupRequestDTO request) {
        return ResponseEntity.ok(userService.logup(request));
    }

}
 */