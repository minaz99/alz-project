package com.alzproject.alzproject.admin;

import com.alzproject.alzproject.patient.Patient;
import com.alzproject.alzproject.patient.PatientService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {
    @Mock
    private AdminRepository adminRepository;
    private AdminService underTest;

    @BeforeEach
    void setUp() {
        underTest = new AdminService(adminRepository);
    }

    @Test
    void getAdmins() {
        underTest.getAdmins();
        verify(adminRepository).findAll();
    }

//    @Test
//    @Disabled
//    void getAdmin() {
//    }

    @Test
    void registerAdmin() {
        Admin admin = new Admin(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password");
        underTest.registerAdmin(admin);

        ArgumentCaptor<Admin> adminArgumentCaptor =
                ArgumentCaptor.forClass((Admin.class));
        verify(adminRepository)
                .save(adminArgumentCaptor.capture());
        Admin capturedPatient = adminArgumentCaptor.getValue();
        assertThat(capturedPatient).isEqualTo(admin);
    }

//    @Test
//    @Disabled
//    void deleteAdmin() {
//    }
//
//    @Test
//    @Disabled
//    void updateAdmin() {
//    }
}