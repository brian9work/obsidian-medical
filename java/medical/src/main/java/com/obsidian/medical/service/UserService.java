package com.obsidian.medical.service;

import com.obsidian.medical.auth.AuthResponse;
import com.obsidian.medical.dto.auth.LoginRequestDTO;
import com.obsidian.medical.dto.auth.LogupRequestDTO;
import com.obsidian.medical.dto.auth.UserRole;
import com.obsidian.medical.jwt.JwtService;
import com.obsidian.medical.model.UserModel;
import com.obsidian.medical.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {
    private final IUserRepository iuserRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequestDTO request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
            ));
            UserDetails user=iuserRepository.findByUsername(request.getUsername()).orElseThrow();
            Optional<UserModel> userRole = iuserRepository.findByUsername(request.getUsername());


            String token=jwtService.getToken(user);
            String role = userRole.get().getRole().toString();
            String email = userRole.get().getEmail();

            return (AuthResponse.builder()
                    .token(token)
                    .role(role)
                    .email(email)
                    .build());
        } catch (Exception e) {
            return AuthResponse.builder()
                    .token(null) // o ""
                    .build();
        }
    }

    public AuthResponse logup(LogupRequestDTO request) {
        UserModel user = UserModel
                .builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .email(request.getEmail())
                .isActive("1")
                .build();

        iuserRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();

    }

    public String getRole(String email) {
        Optional<UserModel> user = iuserRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }

        return user.get().getRole().toString();
    }
}
