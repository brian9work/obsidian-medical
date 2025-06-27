package com.obsidian.medical.repository;

import com.obsidian.medical.model.ExpedientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IExpedientRepository extends JpaRepository<ExpedientModel, Long> {
}
