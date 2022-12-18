package com.alzproject.alzproject.socialworker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface SocialWorkerRepository extends JpaRepository<SocialWorker, Long> {

    @Override
    Optional<SocialWorker> findById(Long aLong);

    @Query("SELECT p FROM SocialWorker p WHERE p.email = ?1")
    Optional<SocialWorker> findSocialWorkerByEmail(String email);
}
