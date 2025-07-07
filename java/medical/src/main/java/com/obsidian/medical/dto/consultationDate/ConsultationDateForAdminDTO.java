package com.obsidian.medical.dto.consultationDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultationDateForAdminDTO {
    String name;
    String lastnamep;
    String lastnamem;
    String id;
    String id_user;
    String date;
    String reason;
    String details;
    String status;
}