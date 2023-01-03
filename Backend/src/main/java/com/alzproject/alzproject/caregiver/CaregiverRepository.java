package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.user.UserRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface CaregiverRepository extends UserRepository {
}
