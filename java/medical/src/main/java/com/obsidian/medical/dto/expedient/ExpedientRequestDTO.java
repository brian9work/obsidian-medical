package com.obsidian.medical.dto.expedient;

import com.obsidian.medical.regex.RegexUser;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Pattern;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpedientRequestDTO {
    String admin;
    String email;
    String urlImage;
    String name;
    String lastnamep;
    String lastnamem;
    String birthdate;
    String gender;
    String historial;
}
