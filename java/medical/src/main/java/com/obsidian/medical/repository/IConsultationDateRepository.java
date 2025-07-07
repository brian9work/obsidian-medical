package com.obsidian.medical.repository;

import com.obsidian.medical.model.ConsultationDateModel;
import com.obsidian.medical.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.lang.Object;

@Repository
public interface IConsultationDateRepository extends JpaRepository<ConsultationDateModel, Long> {
    Optional<ConsultationDateModel> findByDate(String date);

    @Query(value = "SELECT " +
            "u.id, u.username, fc.id, fc.date, fc.reason, fc.details, fc.status " +
            "FROM fecha_consultas fc " +
            "INNER JOIN users u ON fc.id_user=u.id " +
            "WHERE u.email=:emailUser", nativeQuery = true)
    List<Object[]> getByUserEmail(@Param("emailUser") String emailUser);

    @Query(value = "SELECT " +
            "u.id, u.username, fc.id, fc.date, fc.reason, fc.details, fc.status " +
            "FROM fecha_consultas fc " +
            "INNER JOIN users u ON fc.id_user=u.id " +
            "WHERE u.id=:idUser", nativeQuery = true)
    List<Object[]> getByUserId(@Param("idUser") Long idUser);

    @Query(value = "SELECT e.name, e.lastnamep, e.lastnamem, fc.* FROM expedient e " +
            "INNER JOIN users u1 ON e.id_admin=u1.id " +
            "INNER JOIN users u2 ON e.id_user=u2.id " +
            "INNER JOIN fecha_consultas fc ON fc.id_user=e.id_user " +
            "WHERE u1.email=:email ", nativeQuery = true)
    List<Object[]> getByEmailAdmin(@Param("email") String email);

//    @Query(value="SELECT cd FROM ConsultationDateModel cd WHERE cd.id = :id ")
    Optional<ConsultationDateModel> findById(Long id);


    @Query(value="SELECT fc.id_user, u.email FROM fecha_consultas fc " +
            "INNER JOIN users u ON u.id=fc.id_user " +
            "WHERE fc.id=:id ", nativeQuery = true)
    List<Object[]> getIdUser(@Param("id") Long id);

    Optional<ConsultationDateModel> getByUser(UserModel user);


}
