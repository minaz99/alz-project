package com.alzproject.alzproject.caregiver;

import com.alzproject.alzproject.registration.Gender;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CaregiverController.class)
class CaregiverControllerTest {
    @MockBean
    private CaregiverService caregiverService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getPatientsSucceedsWhenCaregiversAreCorrect() throws Exception {
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
        caregiverService.registerCaregiver(caregiver);
        given(caregiverService.getCaregivers()).willReturn(Arrays.asList(caregiver));

        mockMvc.perform(get("/caregiver")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getCaregiverSucceedsWhenRequestParamIdExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/caregiver/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void getCaregiverFailsWhenRequestParamIdIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/caregiver/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerCaregiverSucceedsWhenRequestBodyIsValid() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/caregiver")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"firstName\" : \"tim\",\n" +
                                "    \"lastName\" : \"brown\",\n" +
                                "    \"email\" : \"timbrown2@gmail.com\",\n" +
                                "    \"password\" : \"password\",\n" +
                                "    \"dateOfBirth\" : \"1982-03-02\",\n" +
                                "    \"gender\" : \"MALE\",\n" +
                                "    \"phoneNumber\" : \"123456789\",\n" +
                                "    \"addressId\" : \"Pl. Politechniki 1, 00-661 Warszawa\",\n" +
                                "    \"coordinates\" : \"lat:23-lng:14\",\n" +
                                "    \"needs\" : \"something\"\n" +
                                "}"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void registerCaregiverFailsWhenRequestBodyIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/caregiver")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void deleteCaregiverSucceedsWhenRequestParamIdExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/caregiver/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void deleteCaregiverFailsWhenRequestParamIdIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/caregiver/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateCaregiverSucceedsWhenFirstAndLastNameGiven() throws Exception {
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
        caregiverService.registerCaregiver(caregiver);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/caregiver/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("firstName", "jackie")
                        .param("lastName", "charles"))
                .andDo(print())
                .andExpect(status().isOk()
                );
    }

    @Test
    void updateCaregiverSucceedsWhenFirstAndLastNameEmpty() throws Exception {
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
        caregiverService.registerCaregiver(caregiver);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/caregiver/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("firstName", "")
                        .param("lastName", ""))
                .andDo(print())
                .andExpect(status().isOk()
                );
    }

    @Test
    void updateCaregiverSucceedsWhenMultipleRequestParamsAreProvided() throws Exception {
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
        caregiverService.registerCaregiver(caregiver);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/caregiver/{id}", 1L)
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
    void updateCaregiverFailsWhenRequestParamIdIsNotGiven() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/caregiver/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}