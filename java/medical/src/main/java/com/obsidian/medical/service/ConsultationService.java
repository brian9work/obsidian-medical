package com.obsidian.medical.service;

import com.obsidian.medical.dto.consultation.AllConsultationDTO;
import com.obsidian.medical.dto.consultation.ConsultationDTO;
import com.obsidian.medical.dto.consultation.ConsultationUserDTO;
import com.obsidian.medical.dto.consultationDate.ConsultationDateRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientResponseDTO;
import com.obsidian.medical.dto.treatment.AddConsultationRequestDTO;
import com.obsidian.medical.dto.treatment.AddTreatmentRequestDTO;
import com.obsidian.medical.dto.treatment.TreatmentRequestDTO;
import com.obsidian.medical.dto.vitalSgins.VitalSignsRequestDTO;
import com.obsidian.medical.model.*;
import com.obsidian.medical.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsultationService {
    private final ITreatmentRepository treatmentRepository;
    private final IUserRepository userRepository;
    private final IConsultationRepository consultationRepository;
    private final IExpedientRepository expedientRepository;
    private final IVitalSignsRepository vitalSignsRepository;
    private final IConsultationTreatmentRepository consultaTreatmentRepository;
    private final IConsultationDateRepository consultationDateRepository;

    private final ExpedientService expedientService;

    public ResponseEntity<AllConsultationDTO> getConsultation(Long idConsultationDate){
        AllConsultationDTO allConsultationDTO = new AllConsultationDTO();

        Optional<ConsultationDateModel> optConsultationDate = consultationDateRepository.findById(idConsultationDate);
        if(optConsultationDate.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        Optional<ConsultationModel> optConsultation = consultationRepository.findByConsultationsDate(optConsultationDate.get());
        if(optConsultation.isEmpty()){
            return ResponseEntity.badRequest().build();
        }

        ConsultationModel consultation = optConsultation.get();

        // agregar signos vitales
        VitalSignsModel vitalSigns = consultation.getVitalSigns();
        VitalSignsRequestDTO vitalSignsResponseDTO = new VitalSignsRequestDTO();

        vitalSignsResponseDTO.setId(vitalSigns.getId());
        vitalSignsResponseDTO.setBloodPressure(vitalSigns.getBloodPressure());
        vitalSignsResponseDTO.setTemperature(vitalSigns.getTemperature());
        vitalSignsResponseDTO.setHeight(vitalSigns.getHeight());
        vitalSignsResponseDTO.setWeight(vitalSigns.getWeight());
        vitalSignsResponseDTO.setHeartRate(vitalSigns.getHeartRate());
        vitalSignsResponseDTO.setRespiratoryRate(vitalSigns.getRespiratoryRate());

        allConsultationDTO.setVitalSigns(vitalSignsResponseDTO);

        // Agregar fecha de consulta
        ConsultationDateModel consultationDateModel = optConsultationDate.get();
        ConsultationDateRequestDTO consultationDateRequestDTO = new ConsultationDateRequestDTO();

        consultationDateRequestDTO.setId(consultationDateModel.getId());
        consultationDateRequestDTO.setDate(consultationDateModel.getDate().split(" ")[0]);
        consultationDateRequestDTO.setHour(consultationDateModel.getDate().split(" ")[1]);
        consultationDateRequestDTO.setEmail("");
        consultationDateRequestDTO.setReason(consultationDateModel.getReason());
        consultationDateRequestDTO.setDetails(consultationDateModel.getDetails());
        allConsultationDTO.setConsultationDate(consultationDateRequestDTO);

        // Agregar Expediente
        Optional<ExpedientModel> expedientModel = expedientRepository.findByUser(consultationDateModel.getUser());
        if(expedientModel.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        ExpedientModel expedient = expedientModel.get();
        ExpedientResponseDTO expedientResponseDTO = new ExpedientResponseDTO();
        expedientResponseDTO.setFullName(expedient.getName() + " " + expedient.getLastnamep() + " " + expedient.getLastnamem());
        expedientResponseDTO.setGender(expedient.getGender());
        expedientResponseDTO.setHistorial(expedient.getHistorial());
        expedientResponseDTO.setBirthdate(expedient.getBirthdate());
        expedientResponseDTO.setId(expedient.getId());
        expedientResponseDTO.setAge(expedientService.currentTime(expedient.getBirthdate()));

        allConsultationDTO.setExpedient(expedientResponseDTO);

        // Datos de consulta
        ConsultationDTO consultationDTO = new ConsultationDTO();
        consultationDTO.setDiagnosis(consultation.getDiagnosis());
        consultationDTO.setIndications(consultation.getIndications());
        consultationDTO.setSymptoms(consultation.getSymptoms());
        consultationDTO.setReferencesText(consultation.getReferencesText());

        allConsultationDTO.setConsultation(consultationDTO);

        // Agregar info del user
        ConsultationUserDTO consultationUserDTO = new ConsultationUserDTO();
        consultationUserDTO.setId(consultation.getUser().getId());
        consultationUserDTO.setEmail(consultation.getUser().getEmail());

        allConsultationDTO.setConsultationUser(consultationUserDTO);

        // Añadir tratamiento
        List<AddTreatmentRequestDTO> listTreatment = new ArrayList<>();
        List<ConsultationTreatmentModel> consultationTreatment = consultaTreatmentRepository.findByConsultation(consultation);

        for (ConsultationTreatmentModel treatmentModel : consultationTreatment) {
            AddTreatmentRequestDTO treatment = new AddTreatmentRequestDTO();

            treatment.setName(treatmentModel.getTreatment().getName());
            treatment.setDose(treatmentModel.getTreatment().getDose());
            treatment.setTime(treatmentModel.getTreatment().getTime());
            treatment.setDescription(treatmentModel.getTreatment().getDescription());
            treatment.setVia(treatmentModel.getTreatment().getVia());
            treatment.setStartDate(treatmentModel.getTreatment().getStartDate());
            treatment.setEndDate(treatmentModel.getTreatment().getEndDate());

            listTreatment.add(treatment);
        }
        allConsultationDTO.setTreatments(listTreatment);


        return ResponseEntity.ok().body(allConsultationDTO);
    }
}
