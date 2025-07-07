package com.obsidian.medical.dto.vitalSgins;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VitalSignsRequestDTO {
    Long id;
    String bloodPressure;
    String weight;
    String height;
    String heartRate;
    String temperature;
    String respiratoryRate;
}