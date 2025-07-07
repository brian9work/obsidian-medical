package com.obsidian.medical.dto.treatment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddConsultationRequestDTO {
    private Long idUser;
    private Long idVitalSigns;
    private Long idConsultationDate;
    private String symptoms;
    private String diagnosis;
    private String indications;
    private String referencesText;
    private List<AddTreatmentRequestDTO> treatment;
}
