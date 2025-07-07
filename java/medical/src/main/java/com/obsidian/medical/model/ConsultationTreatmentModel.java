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
@Table(name = "consultaTratamiento")
public class ConsultationTreatmentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "id_consultation")
    private ConsultationModel consultation;
    @ManyToOne
    @JoinColumn(name = "id_treatment")
    private TreatmentModel Treatment;
}
