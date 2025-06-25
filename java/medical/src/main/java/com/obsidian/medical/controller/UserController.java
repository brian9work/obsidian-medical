package com.obsidian.medical.controller;

import com.obsidian.medical.auth.AuthResponse;
import com.obsidian.medical.dto.auth.LoginRequestDTO;
import com.obsidian.medical.dto.auth.LogupRequestDTO;
import com.obsidian.medical.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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