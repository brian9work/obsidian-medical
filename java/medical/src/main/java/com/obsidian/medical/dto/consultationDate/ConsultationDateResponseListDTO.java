package com.obsidian.medical.dto.consultationDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationDateResponseListDTO {
    Long id;
    String username;
    String date;
    String hour;
    String reason;
    String details;
    String status;
}
