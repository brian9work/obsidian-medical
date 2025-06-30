package com.obsidian.medical.service;

import com.obsidian.medical.constant.RegexConstants;
import com.obsidian.medical.dto.expedient.ExpedientRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientResponseDTO;
import com.obsidian.medical.dto.expedient.UserWithExpedientDTO;
import com.obsidian.medical.model.ExpedientModel;
import com.obsidian.medical.model.UserModel;
import com.obsidian.medical.repository.IExpedientRepository;
import com.obsidian.medical.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
//import jakarta.validation.constraints.Pattern;
import java.util.regex.Pattern;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.Period;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExpedientService {
    private final IExpedientRepository expedientRepository;
    private final IUserRepository userRepository;

    public ResponseEntity<String> uploadImage(MultipartFile file) {
        String folderPath = "C:/wamp64/www/obsidian-medical/assets/expedientes";
        File directory = new File(folderPath);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(folderPath, filename); // <- Aquí corregido
        try {
            Files.write(path, file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(filename);
    }

    public static String currentTime(String fechaStr) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            LocalDate fecha = LocalDate.parse(fechaStr, formatter);
            LocalDate hoy = LocalDate.now();

            if (fecha.isAfter(hoy)) {
                return "La fecha es en el futuro";
            }

            Period periodo = Period.between(fecha, hoy);

            return String.format("%d",periodo.getYears());
        } catch (Exception e) {
            return "Formato de fecha inválido. Usa dd-MM-yyyy";
        }
    }

    public ResponseEntity save(ExpedientRequestDTO expReqDTO) {
        ExpedientModel expedientModel = new ExpedientModel();

        if (!Pattern.matches(RegexConstants.EMAIL_REGEX, expReqDTO.getEmail()))
            return ResponseEntity.badRequest().body(RegexConstants.EMAIL_MESSAGE);


        Optional<UserModel> user = userRepository.findByEmail(expReqDTO.getEmail());
        System.out.println(user.isPresent());
        if(user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        if (!Pattern.matches(RegexConstants.URL_IMAGE_REGEX, expReqDTO.getUrlImage())){
            System.out.println(RegexConstants.URL_IMAGE_MESSAGE);
            return ResponseEntity.badRequest().body(RegexConstants.URL_IMAGE_MESSAGE);
        }
        if (!Pattern.matches(RegexConstants.NAME_REGEX, expReqDTO.getName())){
            System.out.println(RegexConstants.NAME_MESSAGE);
            return ResponseEntity.badRequest().body(RegexConstants.NAME_MESSAGE);
        }
        if (!Pattern.matches(RegexConstants.LASTNAME_REGEX, expReqDTO.getLastnamep())){
            System.out.println(RegexConstants.LASTNAME_MESSAGE);
            return ResponseEntity.badRequest().body(RegexConstants.LASTNAME_MESSAGE);
        }
        if (!Pattern.matches(RegexConstants.LASTNAME_REGEX, expReqDTO.getLastnamem())){
            System.out.println(RegexConstants.LASTNAME_MESSAGE);
            return ResponseEntity.badRequest().body(RegexConstants.LASTNAME_MESSAGE);
        }
        if (!Pattern.matches(RegexConstants.BIRTHDATE_REGEX, expReqDTO.getBirthdate())){
            System.out.println(RegexConstants.BIRTHDATE_MESSAGE);
            return ResponseEntity.badRequest().body(RegexConstants.BIRTHDATE_MESSAGE);
        }
        if (!Pattern.matches(RegexConstants.GENDER_REGEX, expReqDTO.getGender())){
            System.out.println(RegexConstants.GENDER_MESSAGE);
            return ResponseEntity.badRequest().body(RegexConstants.GENDER_MESSAGE);
        }
        if (!Pattern.matches(RegexConstants.HISTORIAL_REGEX, expReqDTO.getHistorial())){
            System.out.println(RegexConstants.HISTORIAL_MESSAGE);
            return ResponseEntity.badRequest().body(RegexConstants.HISTORIAL_MESSAGE);
        }


        expedientModel.setUserModel(user.get());
        expedientModel.setUrlImage(expReqDTO.getUrlImage());
        expedientModel.setName(expReqDTO.getName());
        expedientModel.setLastnamep(expReqDTO.getLastnamep());
        expedientModel.setLastnamem(expReqDTO.getLastnamem());
        expedientModel.setBirthdate(expReqDTO.getBirthdate());
        expedientModel.setGender(expReqDTO.getGender());
        expedientModel.setHistorial(expReqDTO.getHistorial());

        expedientRepository.save(expedientModel);

        return ResponseEntity.ok("Expediente guardado");
    }

    public List<ExpedientResponseDTO> getAll(){
        List<ExpedientModel> expedientModels = expedientRepository.findAll();
        List<ExpedientResponseDTO> expedientResponseDTOS = new ArrayList<>();

        for (ExpedientModel expedientModel : expedientModels) {
            ExpedientResponseDTO expedientResponseDTO = new ExpedientResponseDTO();

            expedientResponseDTO.setId(expedientModel.getId());
            expedientResponseDTO.setUrlImage(expedientModel.getUrlImage());
            expedientResponseDTO.setFullName(
                    expedientModel.getName() + " " +
                    expedientModel.getLastnamep() + " " +
                    expedientModel.getLastnamem());
            expedientResponseDTO.setBirthdate(expedientModel.getBirthdate());
            expedientResponseDTO.setHistorial(expedientModel.getHistorial());
            expedientResponseDTO.setGender(expedientModel.getGender());
            expedientResponseDTO.setAge(currentTime(expedientModel.getBirthdate()));

            expedientResponseDTOS.add(expedientResponseDTO);
        }
        return expedientResponseDTOS;
    }

    public ExpedientResponseDTO getById(Long id) {
        Optional<ExpedientModel> expedientModel = expedientRepository.findById(id);
        ExpedientResponseDTO expedientResponseDTO = new ExpedientResponseDTO();

        if (expedientModel.isEmpty()) {
            return expedientResponseDTO;
        }

        ExpedientModel expedient = expedientModel.get();

        expedientResponseDTO.setId(expedient.getId());
        expedientResponseDTO.setUrlImage(expedient.getUrlImage());
        expedientResponseDTO.setFullName(
                expedient.getName() + " " +
                        expedient.getLastnamep() + " " +
                        expedient.getLastnamem());
        expedientResponseDTO.setBirthdate(expedient.getBirthdate());
        expedientResponseDTO.setHistorial(expedient.getHistorial());
        expedientResponseDTO.setGender(expedient.getGender());
        expedientResponseDTO.setAge(currentTime(expedient.getBirthdate()));

        return expedientResponseDTO;
    }

    public ExpedientResponseDTO getExpedient(String email){
        List<Object[]> expedient = expedientRepository.findByEmail(email);
        ExpedientResponseDTO expedientResponseDTO = new ExpedientResponseDTO();

        if (expedient== null || expedient.isEmpty()) {
            return expedientResponseDTO;
        }

        expedientResponseDTO.setId(Long.parseLong(expedient.get(0)[0].toString()));
        expedientResponseDTO.setUrlImage((String) expedient.get(0)[1]);
        expedientResponseDTO.setFullName(
                expedient.get(0)[2] + " " +expedient.get(0)[3] + " " +expedient.get(0)[4]);
        expedientResponseDTO.setBirthdate((String) expedient.get(0)[5]);
        expedientResponseDTO.setHistorial((String) expedient.get(0)[6]);
        expedientResponseDTO.setGender((String) expedient.get(0)[7]);
        expedientResponseDTO.setAge(currentTime((String) expedient.get(0)[5]));

        return expedientResponseDTO;
    }

    public List<UserWithExpedientDTO> findByNotExpedient(){
        List<UserModel> listUsers = expedientRepository.findByNotExpedient();
        List<UserWithExpedientDTO> userWithExpedientDTOS = new ArrayList<>();

        for (UserModel userModel : listUsers) {
            UserWithExpedientDTO userDTO = new UserWithExpedientDTO();
            userDTO.setId(userModel.getId());
            userDTO.setUsername(userModel.getUsername());
            userDTO.setEmail(userModel.getEmail());

            userWithExpedientDTOS.add(userDTO);
        }

        return userWithExpedientDTOS;
    }
}
