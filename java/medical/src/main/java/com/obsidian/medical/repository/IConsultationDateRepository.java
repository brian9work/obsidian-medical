package com.obsidian.medical.repository;

import com.obsidian.medical.model.ConsultationDateModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IConsultationDateRepository extends JpaRepository<ConsultationDateModel, Long> {
}
