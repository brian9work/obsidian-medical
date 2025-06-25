package com.obsidian.medical.controller;

import com.obsidian.medical.auth.AuthResponse;
import com.obsidian.medical.dto.auth.LoginRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
public class TestController {
    @GetMapping
    public String test() {
        return "sistem on line";
    }
}
