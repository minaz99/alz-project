package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.registration.Gender;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class CaregiverRepositoryTest {
    @Autowired
    private CaregiverRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldFindById() {
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
        underTest.save(caregiver);
        //when
        boolean expected = underTest.findById(1L)
                .filter(obj -> obj instanceof Caregiver)
                .map(obj -> (Caregiver) obj).isPresent();
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindById() {
        //given
        Long id = 1L;
        //when
        boolean expected = underTest.findById(id)
                .filter(obj -> obj instanceof Caregiver)
                .map(obj -> (Caregiver) obj).isPresent();
        //then
        assertThat(expected).isFalse();
    }

    @Test
    void itShouldFindCaregiverByEmail() {
        //given
        String email = "johnsmith@gmail.com";
        Caregiver caregiver = new Caregiver(
                "john",
                "smith",
                email,
                "password",
                LocalDate.of(1982, 3, 2),
                Gender.MALE,
                "123456789",
                "Pl. Politechniki 1, 00-661 Warszawa",
                "lat:23-lng:14",
                "personalNeed");
        underTest.save(caregiver);
        //when
        boolean expected = underTest.findUserByEmail(email).isPresent();
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindCaregiverByEmail() {
        //given
        String email = "johnsmith@gmail.com";
        //when
        boolean expected = underTest.findUserByEmail(email).isPresent();
        //then
        assertThat(expected).isFalse();
    }
}