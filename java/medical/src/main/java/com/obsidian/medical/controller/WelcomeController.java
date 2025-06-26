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
        String tokenTmp = (String) body.get("token");
        System.out.println("Recieved information");
        System.out.println(email);
        System.out.println(tokenTmp);
        System.out.println("--------");
        if (email == null || tokenTmp == null) {
            System.out.println("no se recibieron los valores");
            return null;
        }
        return userService.getRole(email, tokenTmp);
    }
}
