package com.obsidian.medical.repository;

import com.obsidian.medical.model.TreatmentModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITreatmentRepository extends JpaRepository<TreatmentModel, Long> {
}
