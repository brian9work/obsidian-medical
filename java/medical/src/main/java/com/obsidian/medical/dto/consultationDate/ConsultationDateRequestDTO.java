package com.obsidian.medical.dto.consultationDate;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationDateRequestDTO {
    Long id;
    String email;
    String date;
    String hour;
    String reason;
    String details;
}
