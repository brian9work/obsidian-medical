package com.obsidian.medical.service;

import com.obsidian.medical.dto.consultationDate.ConsultationDateResponseListDTO;
import com.obsidian.medical.dto.vitalSgins.VitalSignsRequestDTO;
import com.obsidian.medical.dto.vitalSgins.VitalSignsResponseDTO;
import com.obsidian.medical.model.ConsultationDateModel;
import com.obsidian.medical.model.UserModel;
import com.obsidian.medical.model.VitalSignsModel;
import com.obsidian.medical.repository.IUserRepository;
import com.obsidian.medical.repository.IVitalSignsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VitalSignsService {
    private final IVitalSignsRepository vitalSignsRepository;
    private final IUserRepository userRepository;

    public ResponseEntity<String> saveVitalSigns(VitalSignsRequestDTO vitalSignsRequestDTO){
        Optional<UserModel> user = userRepository.findById(vitalSignsRequestDTO.getId());
        if(user.isEmpty()){
            return ResponseEntity.badRequest().body("El usuario no existe");
        }

        VitalSignsModel vitalSignsModel = new VitalSignsModel();

        vitalSignsModel.setUser(user.get());
        vitalSignsModel.setBloodPressure(vitalSignsRequestDTO.getBloodPressure());
        vitalSignsModel.setWeight(vitalSignsRequestDTO.getWeight());
        vitalSignsModel.setHeight(vitalSignsRequestDTO.getHeight());
        vitalSignsModel.setHeartRate(vitalSignsRequestDTO.getHeartRate());
        vitalSignsModel.setTemperature(vitalSignsRequestDTO.getTemperature());
        vitalSignsModel.setRespiratoryRate(vitalSignsRequestDTO.getRespiratoryRate());
        LocalDateTime fecha = LocalDateTime.now();
        String fechaStr = fecha.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        vitalSignsModel.setDate(fechaStr);

        vitalSignsRepository.save(vitalSignsModel);
        return ResponseEntity.ok("Signos vitales guardados");
    }

    public ResponseEntity<List<VitalSignsResponseDTO>> getVitalSignsByUser(Long id){
        Optional<UserModel> user = userRepository.findById(id);
        if(user.isEmpty()){
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }

        try{
            List<VitalSignsModel> vitalSignsList = vitalSignsRepository.getAllByIdUser(id);
            List<VitalSignsResponseDTO> vitalSignsListDTO = new ArrayList<>();

            for (VitalSignsModel vitalSignsModel : vitalSignsList) {
                VitalSignsResponseDTO vsrdto = new VitalSignsResponseDTO();
                vsrdto.setId(vitalSignsModel.getId());
                vsrdto.setTemperature(vitalSignsModel.getTemperature());
                vsrdto.setBloodPressure(vitalSignsModel.getBloodPressure());
                vsrdto.setHeight(vitalSignsModel.getHeight());
                vsrdto.setWeight(vitalSignsModel.getWeight());
                vsrdto.setHeartRate(vitalSignsModel.getHeartRate());
                vsrdto.setRespiratoryRate(vitalSignsModel.getRespiratoryRate());
                vsrdto.setDate(vitalSignsModel.getDate());

                vitalSignsListDTO.add(vsrdto);
            }

            return ResponseEntity.ok(vitalSignsListDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
