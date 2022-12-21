package com.alzproject.alzproject.admin;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class AdminRepositoryTest {
    @Autowired
    private AdminRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldFindById() {
        Admin admin = new Admin(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password");
        underTest.save(admin);
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
    void itShouldFindAdminByEmail() {
        //given
        String email = "johnsmith@gmail.com";
        Admin admin = new Admin(
                "john",
                "smith",
                email,
                "password");
        underTest.save(admin);
        //when
        boolean expected = underTest.findAdminByEmail(email).isPresent();
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void itShouldNotFindAdminByEmail() {
        //given
        String email = "johnsmith@gmail.com";
        //when
        boolean expected = underTest.findAdminByEmail(email).isPresent();
        //then
        assertThat(expected).isFalse();
    }
}