package com.obsidian.medical.repository;

import com.obsidian.medical.model.VitalSignsModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVitalSignsRepository extends JpaRepository<VitalSignsModel, Long> {
}
