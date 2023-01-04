package com.alzproject.alzproject.patient;

import com.alzproject.alzproject.enums.Gender;
import com.alzproject.alzproject.enums.RegisteredBy;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class PatientRepositoryTest {
    @Autowired
    private PatientRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldFindById() {
        //given
        Patient patient = new Patient(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password",
                LocalDate.of(1982, 3, 2),
                Gender.MALE,
                "123456789",
                "Pl. Politechniki 1, 00-661 Warszawa",
                "lat:23-lng:14",
                "Early-onset",
                "Good",
                "Some needs",
                RegisteredBy.PATIENT);
        underTest.save(patient);
        //when
        boolean expected = underTest.findById(1L)
                .filter(obj -> obj instanceof Patient)
                .map(obj -> (Patient) obj).isPresent();
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindById() {
        //given
        Long id = 1L;
        //when
        boolean expected = underTest.findById(id)
                .filter(obj -> obj instanceof Patient)
                .map(obj -> (Patient) obj).isPresent();
        //then
        assertThat(expected).isFalse();
    }

    @Test
    void itShouldFindPatientByEmail() {
        //given
        String email = "johnsmith@gmail.com";
        Patient patient = new Patient(
                "john",
                "smith",
                email,
                "password",
                LocalDate.of(1982, 3, 2),
                Gender.MALE,
                "123456789",
                "Pl. Politechniki 1, 00-661 Warszawa",
                "lat:23-lng:14",
                "Early-onset",
                "Good",
                "Some needs",
                RegisteredBy.PATIENT);
        underTest.save(patient);
        //when
        boolean expected = underTest.findUserByEmail(email)
                .filter(obj -> obj instanceof Patient)
                .map(obj -> (Patient) obj).isPresent();
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindPatientByEmail() {
        //given
        String email = "johnsmith@gmail.com";
        //when
        boolean expected = underTest.findUserByEmail(email)
                .filter(obj -> obj instanceof Patient)
                .map(obj -> (Patient) obj).isPresent();
        //then
        assertThat(expected).isFalse();
    }
}