package com.obsidian.medical.repository;

import com.obsidian.medical.model.ConsultationModel;
import com.obsidian.medical.model.TreatmentProgressModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITreatmentProgressRepository extends JpaRepository<TreatmentProgressModel, Long> {
    List<TreatmentProgressModel> findByConsult(ConsultationModel consultationModel);
}
