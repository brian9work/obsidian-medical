package com.obsidian.medical.service;

import com.obsidian.medical.dto.consultationDate.ConsultationDateForAdminDTO;
import com.obsidian.medical.dto.consultationDate.ConsultationDateRequestDTO;
import com.obsidian.medical.dto.consultationDate.ConsultationDateResponseListDTO;
import com.obsidian.medical.model.ConsultationDateModel;
import com.obsidian.medical.model.ExpedientModel;
import com.obsidian.medical.model.UserModel;
import com.obsidian.medical.repository.IConsultationDateRepository;
import com.obsidian.medical.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.obsidian.medical.dto.enums.ConsultationDateRole;

import com.obsidian.medical.dto.enums.ConsultationDateRole;

@Service
@RequiredArgsConstructor
public class ConsultationDateService {
    private final IConsultationDateRepository consultationDateRepository;
    private final IUserRepository userRepository;
    private final UserService userService;

    public ResponseEntity<String> saveConsultationDate(ConsultationDateRequestDTO consultationDate){
        ConsultationDateModel consultationDateModel = new ConsultationDateModel();

        UserModel user = userService.getUser(consultationDate.getEmail());

        consultationDateModel.setUser(user);
        consultationDateModel.setReason(consultationDate.getReason());
        consultationDateModel.setDetails(consultationDate.getDetails());
        consultationDateModel.setStatus("0");

        String date = consultationDate.getDate();
        String hour = consultationDate.getHour();

        LocalDateTime dateTime;
        try {
            String dateTimeStr = date + " " + hour;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            dateTime = LocalDateTime.parse(dateTimeStr, formatter);
        } catch (Exception e ){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("La fecha tiene un error de formato");
        }
        consultationDateModel.setDate(
                dateTime.getYear() + "-" +
                dateTime.getMonthValue() + "-" +
                dateTime.getDayOfMonth() + " " +
                dateTime.getHour() + ":" +
                dateTime.getMinute()
        );
        try {
            consultationDateRepository.save(consultationDateModel);
        } catch (Exception e ){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.ok("Consulta guardada");
    }

    public ResponseEntity<List<ConsultationDateResponseListDTO>> getConsultationDateByUser(String email){
        Optional<UserModel> user = userRepository.findByEmail(email);
        if(user.isEmpty()){
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }

        try {
            List<Object[]> consulationDateList = consultationDateRepository.getByUserEmail(email);
            List<ConsultationDateResponseListDTO> consultationDateResponseListDTO = new ArrayList<>();

            for (Object[] cdm : consulationDateList) {
                ConsultationDateResponseListDTO consultationDateResponseDTO = new ConsultationDateResponseListDTO();
                consultationDateResponseDTO.setUsername((String) cdm[1]);
                consultationDateResponseDTO.setId(Long.valueOf(cdm[2]+""));
                consultationDateResponseDTO.setDate((cdm[3]+"").split(" ")[0]);
                consultationDateResponseDTO.setHour((cdm[3]+"").split(" ")[1]);
                consultationDateResponseDTO.setReason((String) cdm[4]);
                consultationDateResponseDTO.setDetails((String) cdm[5]);

                consultationDateResponseDTO.setStatus((
                        cdm[6].toString().equals("0") ? "PENDIENTE" :
                                (cdm[6].toString().equals("1") ? "CANCELARA"
//                                    (cdm[6].toString().equals("3") ? "REALIZADA"
                                        : "ACEPTADA"
                                )
                        )
                );
                consultationDateResponseListDTO.add(consultationDateResponseDTO);
            }

            return ResponseEntity.ok(consultationDateResponseListDTO);
        } catch (Exception e ){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }

    public ResponseEntity<List<ConsultationDateForAdminDTO>> getConsultationDateForAdmin(String email){
        Optional<UserModel> user = userRepository.findByEmail(email);

        if(user.isEmpty()){
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }

        List<Object[]> consulationDateList = consultationDateRepository.getByEmailAdmin(email);
        List<ConsultationDateForAdminDTO> cdfa = new ArrayList<>();
        for (Object[] cdm : consulationDateList) {
            ConsultationDateForAdminDTO cdfaLocal= new ConsultationDateForAdminDTO();
            cdfaLocal.setName((String) cdm[0]);
            cdfaLocal.setLastnamep((String) cdm[1]);
            cdfaLocal.setLastnamem((String) cdm[2]);
            cdfaLocal.setId((String) cdm[3].toString());
            cdfaLocal.setDate((String) cdm[5].toString());
            cdfaLocal.setReason((String) cdm[6]);
            cdfaLocal.setDetails((String) cdm[7]);
            cdfaLocal.setStatus((
                    cdm[8].toString().equals("0") ? "PENDIENTE" :
                            (cdm[8].toString().equals("1") ? "CANCELARA"
                                    : "ACEPTADA"
                            )
            ));
            cdfa.add(cdfaLocal);
        }
        return ResponseEntity.ok(cdfa);

    }

    public ResponseEntity<String> getIdUserByIdConsultationDate(Long id){
        List<Object[]> dateOfConsult = consultationDateRepository.getIdUser(id);
        if(dateOfConsult.isEmpty()){
            return ResponseEntity.badRequest().body("El usuario no existe");
        }

        return ResponseEntity.ok(dateOfConsult.get(0)[0] + "-" + dateOfConsult.get(0)[1]);
    }

    public ResponseEntity<List<ConsultationDateResponseListDTO>> getConsultationDateByDate(Long id){
        Optional<UserModel> user = userRepository.findById(id);
        if(user.isEmpty()){
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }

        try {
            List<Object[]> consulationDateList = consultationDateRepository.getByUserId(id);
            List<ConsultationDateResponseListDTO> consultationDateResponseListDTO = new ArrayList<>();

            for (Object[] cdm : consulationDateList) {
                ConsultationDateResponseListDTO consultationDateResponseDTO = new ConsultationDateResponseListDTO();
                consultationDateResponseDTO.setUsername((String) cdm[1]);
                consultationDateResponseDTO.setId(Long.valueOf(cdm[2]+""));
                consultationDateResponseDTO.setDate((cdm[3]+"").split(" ")[0]);
                consultationDateResponseDTO.setHour((cdm[3]+"").split(" ")[1]);
                consultationDateResponseDTO.setReason((String) cdm[4]);
                consultationDateResponseDTO.setDetails((String) cdm[5]);

                System.out.println(cdm[6]);
                consultationDateResponseDTO.setStatus((
                                cdm[6].toString().equals("0") ? "PENDIENTE" :
                                        (cdm[6].toString().equals("1") ? "CANCELARA"
                                                : "ACEPTADA"
                                        )
                        )
                );
                consultationDateResponseListDTO.add(consultationDateResponseDTO);
            }

            return ResponseEntity.ok(consultationDateResponseListDTO);
        } catch (Exception e ){
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }

}