package com.obsidian.medical.dto.expedient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserWithExpedientDTO {
    Long id;
    String username;
    String Email;
}
