package com.obsidian.medical.repository;

import com.obsidian.medical.model.ConsultationModel;
import com.obsidian.medical.model.ConsultationTreatmentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IConsultationTreatmentRepository extends JpaRepository<ConsultationTreatmentModel, Long> {
    List<ConsultationTreatmentModel> findByConsultation(ConsultationModel consultation);
}
