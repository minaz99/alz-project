package com.alzproject.alzproject.patient;

import com.alzproject.alzproject.registration.Gender;
import com.alzproject.alzproject.registration.RegisteredBy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PatientServiceTest {
    @Mock
    private PatientRepository patientRepository;
    private PatientService underTest;

    @BeforeEach
    void setUp() {
        underTest = new PatientService(patientRepository);
    }

    @Test
    void canGetPatients() {
        //when
        underTest.getPatients();
        //then
        verify(patientRepository).findAll();
    }

//    @Test
//    void getPatient() {
//        //given
//        Patient patient = new Patient(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "Early-onset",
//                "Good",
//                RegisteredBy.PATIENT);
//        underTest.registerPatient(patient);
//        //when
//        underTest.getPatient(1L);
//        //then
//        assertThat(patient.getId()).isEqualTo(1L);
//    }

//    @Test
//    void whenNonExistingId() {
//        //given
//        Long id = 1L;
//        //when
//        underTest.getPatient(id);
//        //then
//        boolean expected = patientRepository.findById(id).isPresent();
//        assertThatThrownBy(() -> underTest.getPatient(id))
//                .isInstanceOf(IllegalStateException.class)
//                .hasMessageContaining("Non-existing patient id");
//        //assertThat(expected).isFalse();
//    }

    @Test
    void canRegisterPatient() {
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
                "Early-onset",
                "Good",
                "Some needs",
                RegisteredBy.PATIENT);
        //when
        underTest.registerPatient(patient);
        //then
        ArgumentCaptor<Patient> patientArgumentCaptor =
                ArgumentCaptor.forClass((Patient.class));
        verify(patientRepository)
                .save(patientArgumentCaptor.capture());
        Patient capturedPatient = patientArgumentCaptor.getValue();
        assertThat(capturedPatient).isEqualTo(patient);
        //we ensure that the repo is invoked with the save method at the same time we capture that value, so that we make sure that the value is the exact same the one which was invoked by the test
    }

//    @Test
//    void willThrowExceptionWhenEmailIsTaken() {
//        //given
//        Patient patient = new Patient(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "Early-onset",
//                "Good",
//                RegisteredBy.PATIENT);
//        //when
//        //doReturn(true).when(patientRepository).findPatientByEmail(patient.getEmail());
//        boolean present = patientRepository.findPatientByEmail(patient.getEmail()).isPresent();
//        given(present).willReturn(true);
//        //then
//        assertThatThrownBy(() -> underTest.registerPatient(patient))
//                .isInstanceOf(IllegalStateException.class)
//                .hasMessageContaining("Existing patient");
//        verify(patientRepository, never()).save(any());
//    }
//
//    @Test
//    void registerPatientFailsWhenRequiredFieldsAreEmpty() {
//    }
//
//    @Test
//    void deletePatientSucceedsWhenIdExists() {
//        Patient patient = new Patient(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "Early-onset",
//                "Good",
//                RegisteredBy.PATIENT);
//        underTest.registerPatient(patient);
//
//        when(patientRepository.findById(patient.getId())).thenReturn(Optional.of(patient));
//        //given(patientRepository.findById(patient.getId()).isPresent()).;
//        verify(patientRepository).delete(patient);
//    }
//
//    @Test
//    void deletePatientSucceedsWhenIdDoesNotExist() {
//        Patient patient = new Patient(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "Early-onset",
//                "Good",
//                RegisteredBy.PATIENT);
//        underTest.registerPatient(patient);
//
//        assertThat(patientRepository.findPatientByEmail(patient.getEmail())).isPresent();
//        //given(present).willReturn(true);
//        verify(patientRepository).delete(patient);
//
//    }
//
//    @Test
//    void updatePatient() {
//        Patient patient = new Patient(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "Early-onset",
//                "Good",
//                RegisteredBy.PATIENT);
//        underTest.registerPatient(patient);
//
//
//
//
//    }
}