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
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
//    public String login(@RequestBody LoginRequestDTO request) {
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequestDTO request) {
        System.out.println("\n\n\n ******************** \n\n\n");
        System.out.println("login");
//        return userService.login(request);
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/logup")
    public ResponseEntity<AuthResponse> logup(@RequestBody LogupRequestDTO request) {
        return ResponseEntity.ok(userService.logup(request));
    }
}