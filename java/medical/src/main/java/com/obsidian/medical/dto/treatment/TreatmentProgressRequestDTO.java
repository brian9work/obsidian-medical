package com.obsidian.medical.dto.treatment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TreatmentProgressRequestDTO {
    private Long consultationId;
    private String date;
    private String details;

}
