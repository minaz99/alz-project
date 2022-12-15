package com.alzproject.alzproject.caregiver;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface CaregiverRepository extends JpaRepository<Caregiver, Long> {

    @Override
    Optional<Caregiver> findById(Long aLong);

    @Query("SELECT p FROM Caregiver p WHERE p.email = ?1")
    Optional<Caregiver> findCaregiverByEmail(String email);
}
