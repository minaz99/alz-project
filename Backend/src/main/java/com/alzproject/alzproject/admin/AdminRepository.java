package com.alzproject.alzproject.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Override
    Optional<Admin> findById(Long aLong);

    @Query("SELECT p FROM Admin p WHERE p.email = ?1")
    Optional<Admin> findAdminByEmail(String email);

}
