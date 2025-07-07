package com.obsidian.medical.repository;

import com.obsidian.medical.model.VitalSignsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IVitalSignsRepository extends JpaRepository<VitalSignsModel, Long> {
    @Query(value = "SELECT vs FROM VitalSignsModel vs WHERE vs.user.id=:id ORDER BY vs.id DESC ")
    List<VitalSignsModel> getAllByIdUser(@Param("id") Long id);

    Optional<VitalSignsModel> findById(Long id);
}
