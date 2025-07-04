package com.obsidian.medical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tratamiento")
public class TreatmentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "id_treatment_progress")
    private TreatmentProgressModel TreatmentProgress;
    String name;
    String description;
    String dose;
    String time;
    String via;
    LocalDateTime start_date;
    LocalDateTime end_date;
}



