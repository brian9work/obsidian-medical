package com.obsidian.medical.dto.expedient;

import com.obsidian.medical.constant.RegexConstants;
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
    @Pattern(regexp = RegexConstants.EMAIL_REGEX, message = RegexConstants.EMAIL_MESSAGE)
    String email;
    @Pattern(regexp = RegexConstants.URL_IMAGE_REGEX, message = RegexConstants.URL_IMAGE_MESSAGE)
    String urlImage;
    @Pattern(regexp = RegexConstants.NAME_REGEX, message = RegexConstants.NAME_MESSAGE)
    String name;
    @Pattern(regexp = RegexConstants.LASTNAME_REGEX, message = RegexConstants.LASTNAME_MESSAGE)
    String lastnamep;
    @Pattern(regexp = RegexConstants.LASTNAME_REGEX, message = RegexConstants.LASTNAME_MESSAGE)
    String lastnamem;
    @Pattern(regexp = RegexConstants.BIRTHDATE_REGEX, message = RegexConstants.BIRTHDATE_MESSAGE)
    String birthdate;
    @Pattern(regexp = RegexConstants.GENDER_REGEX, message = RegexConstants.GENDER_MESSAGE)
    String gender;
    @Pattern(regexp = RegexConstants.HISTORIAL_REGEX, message = RegexConstants.HISTORIAL_MESSAGE)
    String historial;
}
