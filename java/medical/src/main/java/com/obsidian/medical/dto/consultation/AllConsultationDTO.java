package com.obsidian.medical.dto.consultation;
import com.obsidian.medical.dto.consultationDate.ConsultationDateRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientResponseDTO;
import com.obsidian.medical.dto.treatment.AddTreatmentRequestDTO;
import com.obsidian.medical.dto.vitalSgins.VitalSignsRequestDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AllConsultationDTO {
    VitalSignsRequestDTO vitalSigns;
    ConsultationDateRequestDTO consultationDate;
    ExpedientResponseDTO expedient;
    ConsultationDTO consultation;
    ConsultationUserDTO consultationUser;
    List<AddTreatmentRequestDTO> treatments;
}
