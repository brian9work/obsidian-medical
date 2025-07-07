package com.obsidian.medical.dto.treatment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TreatmentRequestDTO {
    String name;
    String description;
    String dose;
    String time;
    String via;
    String startDate;
    String endDate;
}
