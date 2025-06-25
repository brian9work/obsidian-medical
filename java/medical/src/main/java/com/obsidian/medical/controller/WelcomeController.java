package com.obsidian.medical.controller;

import com.obsidian.medical.dto.auth.LoginRequestDTO;
import com.obsidian.medical.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/welcome")
@RequiredArgsConstructor
public class WelcomeController {

    private final UserService userService;

    @PostMapping
    public String welcome(@RequestBody Map<String, Object> body) {
        String email = (String) body.get("email");
        return userService.getRole(email);
    }
}
