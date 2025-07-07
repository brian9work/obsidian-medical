package com.obsidian.medical.dto.treatment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddTreatmentRequestDTO {
    private String name;
    private String description;
    private String dose;
    private String time;
    private String via;
    private String startDate;
    private String endDate;
}
