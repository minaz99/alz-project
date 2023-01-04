package com.alzproject.alzproject.patient;

import com.alzproject.alzproject.enums.Gender;
import com.alzproject.alzproject.enums.RegisteredBy;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PatientController.class)
class PatientControllerTest {
    @MockBean
    private PatientService patientService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getPatientsSucceedsWhenPatientsAreCorrect() throws Exception {
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
        patientService.registerPatient(patient);
        given(patientService.getPatients()).willReturn(Arrays.asList(patient));

        mockMvc.perform(get("/patient")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getPatientSucceedsWhenRequestParamIdExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/patient/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void getPatientFailsWhenRequestParamIdIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/patient/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerPatientSucceedsWhenRequestBodyIsValid() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .post("/patient")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"firstName\" : \"Haku\",\n" +
                                "    \"lastName\" : \"Mizou\",\n" +
                                "    \"email\" : \"timbrown29@gmail.com\",\n" +
                                "    \"password\" : \"password\",\n" +
                                "    \"dateOfBirth\" : \"1982-03-02\",\n" +
                                "    \"gender\" : \"FEMALE\",\n" +
                                "    \"phoneNumber\" : \"123456789\",\n" +
                                "    \"addressId\" : \"seton/1 - Bemowo\",\n" +
                                "    \"coordinates\" : \"lat:23-lng:14\",\n" +
                                "    \"illnessType\" : \"Early-onset\",\n" +
                                "    \"conditionDescription\" : \"Good\",\n" +
                                "    \"needs\" : \"Some needs\",\n" +
                                "    \"registeredBy\" : \"PATIENT\"\n" +
                                "}"))
                .andDo(print())
                .andExpect(status().isOk());
    }
    @Test
    void registerPatientFailsWhenRequestBodyIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/patient")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void deletePatientSucceedsWhenRequestParamIdExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/patient/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void deletePatientFailsWhenRequestParamIdIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/patient/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void updatePatientSucceedsWhenFirstAndLastNameGiven() throws Exception {
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
        patientService.registerPatient(patient);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/patient/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("firstName", "jackie")
                        .param("lastName", "charles"))
                .andDo(print())
                .andExpect(status().isOk()
//                .andExpect(jsonPath("$.[0].id").exists())
//                .andExpect(jsonPath("$.[0].firstName").value("jackie")
//                .andExpect(jsonPath("$.[0].lastName").value("charles")

//                .andExpect(jsonPath("$", hasSize(1)))
//                .andExpect(jsonPath("$[0].name", is(alex.getName())));
                );
    }

    @Test
    void updatePatientSucceedsWhenFirstAndLastNameEmpty() throws Exception {
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
        patientService.registerPatient(patient);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/patient/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("firstName", "")
                        .param("lastName", ""))
                .andDo(print())
                .andExpect(status().isOk()
                );
    }

    @Test
    void updatePatientSucceedsWhenMultipleRequestParamsAreProvided() throws Exception {
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
        patientService.registerPatient(patient);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/patient/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("firstName", "daniel")
                        .param("lastName", "darcy")
                        .param("email", "danieldarcy@gmail.com")
                        .param("password", "elizabeth123")
                        .param("phoneNumber", "222333888"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void updatePatientFailsWhenRequestParamIdIsNotGiven() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/patient/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}