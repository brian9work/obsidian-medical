package com.obsidian.medical.repository;

import com.obsidian.medical.model.ExpedientModel;
import com.obsidian.medical.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IExpedientRepository extends JpaRepository<ExpedientModel, Long> {
    @Query(value= "SELECT e.id, e.urlImage, e.name, e.lastnamep, e.lastnamem, e.birthdate, e.historial, e.gender, u.username " +
            "FROM ExpedientModel e " +
            "INNER JOIN UserModel u ON e.userModel.id = u.id " +
            "WHERE u.email = :email")
    List<Object[]> findByEmail(@Param("email") String email);

    @Query(value="SELECT u FROM UserModel u " +
            "lEFT JOIN ExpedientModel e ON u.id  = e.userModel.id " +
            "WHERE e.userModel.id IS NULL")
    List<UserModel> findByNotExpedient();

}
