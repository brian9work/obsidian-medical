package com.obsidian.medical.service;

import com.obsidian.medical.dto.treatment.AddConsultationRequestDTO;
import com.obsidian.medical.dto.treatment.AddTreatmentRequestDTO;
import com.obsidian.medical.dto.treatment.TreatmentRequestDTO;
import com.obsidian.medical.model.*;
import com.obsidian.medical.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TreatmentService {
    private final ITreatmentRepository treatmentRepository;
    private final IUserRepository userRepository;
    private final IConsultationRepository consultationRepository;
    private final IVitalSignsRepository vitalSignsRepository;
    private final IConsultationTreatmentRepository consultaTreatmentRepository;
    private final IConsultationDateRepository consultationDateRepository;

    public ResponseEntity<String> saveTreatment(TreatmentRequestDTO treatmentRequestDTO){
        TreatmentModel treatmentModel = new TreatmentModel();

        treatmentModel.setDescription(treatmentRequestDTO.getDescription());
        treatmentModel.setName(treatmentRequestDTO.getName());
        treatmentModel.setDose(treatmentRequestDTO.getDose());
        treatmentModel.setTime(treatmentRequestDTO.getTime());
        treatmentModel.setVia(treatmentRequestDTO.getVia());

        try {
            String sd = treatmentRequestDTO.getStartDate();
            DateTimeFormatter formatterSD = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDateTime.parse(sd, formatterSD);

            String ed = treatmentRequestDTO.getStartDate();
            DateTimeFormatter formatterED = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDateTime.parse(ed, formatterED);
        } catch (Exception e ){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("La fecha tiene un error de formato");
        }

        treatmentModel.setStartDate(treatmentRequestDTO.getStartDate());
        treatmentModel.setEndDate(treatmentRequestDTO.getEndDate());

        treatmentRepository.save(treatmentModel);
        return ResponseEntity.ok().body("Tratamiento guardado");
    }

    public ResponseEntity<String> saveConsultation(AddConsultationRequestDTO addConsultationRequestDTO){

        List<Long> listOfTreatment = new ArrayList<>();
        List<TreatmentModel> listOfTreatmentModel = new ArrayList<>();

        // Add treatment
        for (AddTreatmentRequestDTO addtrdto : addConsultationRequestDTO.getTreatment()){
            TreatmentModel treatmentModel = new TreatmentModel();

            treatmentModel.setName(addtrdto.getName());
            treatmentModel.setDescription(addtrdto.getDescription());
            treatmentModel.setDose(addtrdto.getDose());
            treatmentModel.setVia(addtrdto.getVia());
            treatmentModel.setTime(addtrdto.getTime());
            treatmentModel.setStartDate(addtrdto.getStartDate());
            treatmentModel.setEndDate(addtrdto.getEndDate());
            TreatmentModel tm = treatmentRepository.save(treatmentModel);
            listOfTreatment.add(tm.getId());
            listOfTreatmentModel.add(tm);
            System.out.println((tm.getId()+"") + ": " + addtrdto.getName());
        }

        // Add consult
        ConsultationModel consultationModel = new ConsultationModel();

        Optional<UserModel> user = userRepository.findById(addConsultationRequestDTO.getIdUser());
        if(user.isEmpty()) return ResponseEntity.badRequest().body("No existe usuario");
        Optional<VitalSignsModel> vitalSigns = vitalSignsRepository.findById(addConsultationRequestDTO.getIdVitalSigns());
        if(vitalSigns.isEmpty()) return ResponseEntity.badRequest().body("Los signos vital no estan registrdados ");
        Optional<ConsultationDateModel> conslDate = consultationDateRepository.findById(addConsultationRequestDTO.getIdConsultationDate());
        if(conslDate.isEmpty()) return ResponseEntity.badRequest().body("La fecha de consulta no existe ");

        conslDate.get().setStatus("3");
        consultationDateRepository.save(conslDate.get());

        consultationModel.setUser(user.get());
        consultationModel.setVitalSigns(vitalSigns.get());
        consultationModel.setConsultationsDate(conslDate.get());

        consultationModel.setSymptoms(addConsultationRequestDTO.getSymptoms());
        consultationModel.setDiagnosis(addConsultationRequestDTO.getDiagnosis());
        consultationModel.setIndications(addConsultationRequestDTO.getIndications());
        consultationModel.setReferencesText(addConsultationRequestDTO.getReferencesText());
        consultationModel.setStudies("Sin estudios");

        ConsultationModel newConsultation = consultationRepository.save(consultationModel);

        for (TreatmentModel treatmentlocal : listOfTreatmentModel) {
            ConsultationTreatmentModel consultationTreatmentModel = new ConsultationTreatmentModel();
            consultationTreatmentModel.setConsultation(consultationModel);
            consultationTreatmentModel.setTreatment(treatmentlocal);

            consultaTreatmentRepository.save(consultationTreatmentModel);
        }

        return ResponseEntity.ok("Consulta guardada");
    }


}
/*
 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'references,studies,symptoms,id_user,id_vital_signs) values (19,'diagnosis','indi' at line 1

 */