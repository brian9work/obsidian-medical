package com.obsidian.medical.dto.consultation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationDTO {
    private String symptoms;
    private String diagnosis;
    private String indications;
    private String referencesText;
}
