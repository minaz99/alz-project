package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.enums.Gender;
import com.alzproject.alzproject.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CaregiverServiceTest {
    @Mock
    private CaregiverRepository caregiverRepository;
    @Mock
    private UserRepository userRepository;
    private CaregiverService underTest;

    @BeforeEach
    void setUp() {
        underTest = new CaregiverService(caregiverRepository, userRepository);
    }

    @Test
    void getCaregivers() {
        underTest.getCaregivers();
        verify(caregiverRepository).findAll();
    }

//    @Test
//    @Disabled
//    void getCaregiver() {
//    }

    @Test
    void registerCaregiver() {
        Caregiver caregiver = new Caregiver(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password",
                LocalDate.of(1982, 3, 2),
                Gender.MALE,
                "123456789",
                "Pl. Politechniki 1, 00-661 Warszawa",
                "lat:23-lng:14",
                "personalNeed");
        underTest.registerCaregiver(caregiver);

        ArgumentCaptor<Caregiver> caregiverArgumentCaptor =
                ArgumentCaptor.forClass((Caregiver.class));
        verify(caregiverRepository)
                .save(caregiverArgumentCaptor.capture());
        Caregiver capturedCaregiver = caregiverArgumentCaptor.getValue();
        assertThat(capturedCaregiver).isEqualTo(caregiver);
    }

//    @Test
//    @Disabled
//    void deleteCaregiver() {
//    }
//
//    @Test
//    @Disabled
//    void updateCaregiver() {
//    }
}