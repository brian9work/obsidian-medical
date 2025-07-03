package com.obsidian.medical.service;

import com.obsidian.medical.auth.AuthResponse;
import com.obsidian.medical.constant.RegexConstants;
import com.obsidian.medical.dto.auth.LoginRequestDTO;
import com.obsidian.medical.dto.auth.LogupRequestDTO;
import com.obsidian.medical.dto.auth.UserRole;
import com.obsidian.medical.jwt.JwtService;
import com.obsidian.medical.model.UserModel;
import com.obsidian.medical.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;


@Service
@RequiredArgsConstructor
public class UserService {
    private final IUserRepository iuserRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequestDTO request) {

        if (!Pattern.matches(RegexConstants.USER_REGEX, request.getUsername())){
            System.out.println(RegexConstants.USER_MESSAGE);
            return AuthResponse.builder().token(null).build();
        }
        if (!Pattern.matches(RegexConstants.PASSWORD_REGEX, request.getPassword())){
            System.out.println(RegexConstants.PASSWORD_MESSAGE);
            return AuthResponse.builder().token(null).build();
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
            ));
            UserDetails userDet=iuserRepository.findByUsername(request.getUsername()).orElseThrow();


            Optional<UserModel> userRole = iuserRepository.findByUsername(request.getUsername());
            UserModel user = userRole.get();

            String token=jwtService.getToken(userDet);
            String role = user.getRole().toString();
            String email = user.getEmail();

            user.setTmp(token);
            iuserRepository.save(user);

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

        if (!Pattern.matches(RegexConstants.EMAIL_REGEX, request.getEmail())){
            System.out.println(RegexConstants.EMAIL_MESSAGE);
            return AuthResponse.builder().token(null).build();
        }
        if (!Pattern.matches(RegexConstants.USER_REGEX, request.getUsername())){
            System.out.println(RegexConstants.USER_MESSAGE);
            return AuthResponse.builder().token(null).build();
        }
        if (!Pattern.matches(RegexConstants.PASSWORD_REGEX, request.getPassword())){
            System.out.println(RegexConstants.PASSWORD_MESSAGE);
            return AuthResponse.builder().token(null).build();
        }

        Optional<UserModel> validateEmail = iuserRepository.findByEmail(request.getEmail());

        if (validateEmail.isPresent()) {
            System.out.println("El correo ya existe");
            return null;
        }

        Optional<UserModel> validateUser = iuserRepository.findByUsername(request.getUsername());
        if (validateUser.isPresent()) {
            System.out.println("El usuario ya existe");
            return null;
        }

        UserModel user = UserModel
                .builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(UserRole.USER)
                .email(request.getEmail())
                .isActive("1")
                .build();

        String token=jwtService.getToken(user);

        user.setTmp(token);
        iuserRepository.save(user);

        return AuthResponse.builder()
                .token(token)
                .build();

    }

    public String getRole(String email, String token) {
        Optional<UserModel> user = iuserRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException(email);
        }
        if(!user.get().getTmp().equals(token)){
            System.out.println("El correo no coincide con el token");
            throw new UsernameNotFoundException(email);
        }
        return user.get().getRole().toString();
    }
}
