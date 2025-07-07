package com.obsidian.medical.model;

import com.obsidian.medical.dto.enums.ConsultationDateRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fecha_consultas")
public class ConsultationDateModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserModel user;
    String date;
    String reason;
    String details;
    String status;
}