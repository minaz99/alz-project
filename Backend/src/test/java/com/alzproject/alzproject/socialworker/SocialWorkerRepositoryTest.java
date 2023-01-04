package com.alzproject.alzproject.socialworker;

import com.alzproject.alzproject.enums.Gender;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class SocialWorkerRepositoryTest {
    @Autowired
    private SocialWorkerRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldFindById() {
        //given
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
        underTest.save(socialWorker);
        //when
        boolean expected = underTest.findById(1L).isPresent();
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindById() {
        //given
        Long id = 1L;
        //when
        boolean expected = underTest.findById(id).isPresent();
        //then
        assertThat(expected).isFalse();
    }

    @Test
    void itShouldFindPatientByEmail() {
        //given
        String email = "johnsmith@gmail.com";
        SocialWorker socialWorker = new SocialWorker(
                "john",
                "smith",
                email,
                "password",
                LocalDate.of(1982, 3, 2),
                Gender.MALE,
                "123456789",
                "Pl. Politechniki 1, 00-661 Warszawa",
                "lat:23-lng:14");
        underTest.save(socialWorker);
        //when
        boolean expected = underTest.findUserByEmail(email)
                .filter(obj -> obj instanceof SocialWorker)
                .map(obj -> (SocialWorker) obj).isPresent();
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindPatientByEmail() {
        //given
        String email = "johnsmith@gmail.com";
        //when
        boolean expected = underTest.findUserByEmail(email)
                .filter(obj -> obj instanceof SocialWorker)
                .map(obj -> (SocialWorker) obj).isPresent();
        //then
        assertThat(expected).isFalse();
    }
}