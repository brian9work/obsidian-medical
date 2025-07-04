package com.obsidian.medical.repository;

import com.obsidian.medical.model.TreatmentProgressModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITreatmentProgressRepository extends JpaRepository<TreatmentProgressModel, Long> {
}
