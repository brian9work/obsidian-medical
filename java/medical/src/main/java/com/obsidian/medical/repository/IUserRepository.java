package com.obsidian.medical.repository;
import com.obsidian.medical.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByUsername(String username);
    Optional<UserModel> findByEmail(String email);


    @Query(value= "SELECT u FROM UserModel u " +
            "WHERE u.role='ADMIN' AND u.email = :email ")
    Optional<UserModel> isAdmin(@Param("email") String email);

//    Optional<User> findByUsername(String username);
}
