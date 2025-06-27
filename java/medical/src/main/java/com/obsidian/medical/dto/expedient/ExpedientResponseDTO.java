package com.obsidian.medical.dto.expedient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpedientResponseDTO {
    Long id;
    String urlImage;
    String fullName;
    String birthdate;
    String age;
    String gender;
    String historial;
}
