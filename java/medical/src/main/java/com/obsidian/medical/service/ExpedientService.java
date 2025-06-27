package com.obsidian.medical.service;

import com.obsidian.medical.dto.expedient.ExpedientRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientResponseDTO;
import com.obsidian.medical.model.ExpedientModel;
import com.obsidian.medical.model.UserModel;
import com.obsidian.medical.repository.IExpedientRepository;
import com.obsidian.medical.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.Period;

@Service
@RequiredArgsConstructor
public class ExpedientService {
    private final IExpedientRepository expedientRepository;
    private final IUserRepository userRepository;

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

    public ResponseEntity save(ExpedientRequestDTO expedientRequestDTO) {
        ExpedientModel expedientModel = new ExpedientModel();

        Optional<UserModel> user = userRepository.findByEmail(expedientRequestDTO.getEmail());
        System.out.println(user.isPresent());
        if(user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        expedientModel.setUserModel(user.get());
        expedientModel.setUrlImage(expedientRequestDTO.getUrlImage());
        expedientModel.setName(expedientRequestDTO.getName());
        expedientModel.setLastnamep(expedientRequestDTO.getLastnamep());
        expedientModel.setLastnamem(expedientRequestDTO.getLastnamem());
        expedientModel.setBirthdate(expedientRequestDTO.getBirthdate());
        expedientModel.setGender(expedientRequestDTO.getGender());
        expedientModel.setHistorial(expedientRequestDTO.getHistorial());

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

}
