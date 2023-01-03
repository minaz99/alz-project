package com.alzproject.alzproject.socialworker;

import com.alzproject.alzproject.registration.Gender;
import com.alzproject.alzproject.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class SocialWorkerServiceTest {
    @Mock
    private SocialWorkerRepository socialWorkerRepository;
    @Mock
    private UserRepository userRepository;
    private SocialWorkerService underTest;

    @BeforeEach
    void setUp() {
        underTest = new SocialWorkerService(socialWorkerRepository, userRepository);
    }

    @Test
    void getActiveSocialWorkers() {
        underTest.getActiveSocialWorkers();
        verify(socialWorkerRepository).findAll();
    }

    @Test
    void getNotActivatedSocialWorkers() {
        underTest.getNotActivatedSocialWorkers();
        verify(socialWorkerRepository).findAll();
    }

//    @Test
//    @Disabled
//    void getSocialWorker() {
//    }

    @Test
    void registerSocialWorker() {
        SocialWorker socialWorker = new SocialWorker(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password",
                LocalDate.of(1982, 3, 2),
                Gender.MALE,
                "123456789",
                "Pl. Politechniki 1, 00-661 Warszawa",
                "lat:23-lng:14");
        underTest.registerSocialWorker(socialWorker);

        ArgumentCaptor<SocialWorker> socialWorkerArgumentCaptor =
                ArgumentCaptor.forClass((SocialWorker.class));
        verify(socialWorkerRepository)
                .save(socialWorkerArgumentCaptor.capture());
        SocialWorker capturedSocialWorker = socialWorkerArgumentCaptor.getValue();
        assertThat(capturedSocialWorker).isEqualTo(socialWorker);
    }

//    @Test
//    @Disabled
//    void deleteSocialWorker() {
//    }
//
//    @Test
//    @Disabled
//    void activateSocialWorker() {
//    }
//
//    @Test
//    @Disabled
//    void updateSocialWorker() {
//    }
}