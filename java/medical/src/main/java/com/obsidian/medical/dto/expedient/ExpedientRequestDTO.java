package com.obsidian.medical.dto.expedient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpedientRequestDTO {
    String email;
    String urlImage;
    String name;
    String lastnamep;
    String lastnamem;
    String birthdate;
    String gender;
    String historial;
}
