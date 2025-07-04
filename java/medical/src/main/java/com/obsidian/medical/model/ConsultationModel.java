package com.obsidian.medical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fechaConsultas")
public class ConsultationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserModel user;
    @ManyToOne
    @JoinColumn(name = "id_vital_signs")
    private VitalSignsModel vitalSigns;
    @ManyToOne
    @JoinColumn(name = "id_treatment")
    private TreatmentModel treatment;
    @ManyToOne
    @JoinColumn(name = "id_consultation_date")
    private ConsultationDateModel consultationsDate;
    String symptoms;
    String diagnosis;
    String indications;
    String studies;
    String references;
}