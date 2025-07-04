package com.obsidian.medical.repository;

import com.obsidian.medical.model.ConsultationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IConsultationRepository extends JpaRepository<ConsultationModel, Long> {
}
