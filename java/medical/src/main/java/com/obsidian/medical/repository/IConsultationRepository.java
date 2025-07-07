package com.obsidian.medical.repository;

import com.obsidian.medical.model.ConsultationDateModel;
import com.obsidian.medical.model.ConsultationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IConsultationRepository extends JpaRepository<ConsultationModel, Long> {
    Optional<ConsultationModel> findById(Long id);

    Optional<ConsultationModel> findByConsultationsDate(ConsultationDateModel consultationDateModel);
}
