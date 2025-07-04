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
@Table(name = "signosVitales")
public class VitalSignsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserModel user;
    String bloodPressure;
    String weight;
    String height;
    String heartRate;
    String temperature;
    String respiratoryRate;
}

