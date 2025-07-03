package com.obsidian.medical.repository;

import com.obsidian.medical.model.ExpedientModel;
import com.obsidian.medical.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface IExpedientRepository extends JpaRepository<ExpedientModel, Long> {
    @Query(value= "SELECT e.id, e.urlImage, e.name, e.lastnamep, e.lastnamem, e.birthdate, e.historial, e.gender, u.username " +
            "FROM ExpedientModel e " +
            "INNER JOIN UserModel u ON e.user.id = u.id " +
            "WHERE u.email = :email")
    List<Object[]> findByEmail(@Param("email") String email);

    @Query(value="SELECT u FROM UserModel u " +
            "lEFT JOIN ExpedientModel e ON u.id  = e.user.id " +
            "WHERE e.user.id IS NULL")
    List<UserModel> findByNotExpedient();

    Page<ExpedientModel> findAll(Pageable pageable);

    @Query(value="SELECT e FROM ExpedientModel e WHERE e.admin.email = :email")
    Page<ExpedientModel> getByAdmin(@Param("email") String email,
                                    Pageable pageable);

}
