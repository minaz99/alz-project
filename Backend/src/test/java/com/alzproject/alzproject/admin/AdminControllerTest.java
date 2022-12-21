package com.alzproject.alzproject.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminController.class)
class AdminControllerTest {
    @MockBean
    private AdminService adminService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAdminsSucceedsWhenAdminsAreCorrect() throws Exception {
        Admin admin = new Admin(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password");
        adminService.registerAdmin(admin);
        List<Admin> allAdmins = Arrays.asList(admin);
        given(adminService.getAdmins()).willReturn(allAdmins);

        mockMvc.perform(get("/admin")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getAdminSucceedsWhenRequestParamIdExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/admin/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void getAdminFailsWhenRequestParamIdIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/admin/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerAdminSucceedsWhenRequestBodyIsValid() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/admin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "    \"firstName\" : \"david\",\n" +
                                "    \"lastName\" : \"williams\",\n" +
                                "    \"email\" : \"davidwilliams@gmail.com\",\n" +
                                "    \"password\" : \"password\"\n" +
                                "}"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void registerAdminFailsWhenRequestBodyIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/admin")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void deleteAdminSucceedsWhenRequestParamIdExists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/admin/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void deleteAdminFailsWhenRequestParamIdIsEmpty() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/admin/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    void updateAdminSucceedsWhenFirstAndLastNameGiven() throws Exception {
        Admin admin = new Admin(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password");
        adminService.registerAdmin(admin);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/admin/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("firstName", "jackie")
                        .param("lastName", "charles"))
                .andDo(print())
                .andExpect(status().isOk()
                );
    }

    @Test
    void updateAdminSucceedsWhenFirstAndLastNameEmpty() throws Exception {
        Admin admin = new Admin(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password");
        adminService.registerAdmin(admin);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/admin/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("firstName", "")
                        .param("lastName", ""))
                .andDo(print())
                .andExpect(status().isOk()
                );
    }

    @Test
    void updateAdminSucceedsWhenMultipleRequestParamsAreProvided() throws Exception {
        Admin admin = new Admin(
                "john",
                "smith",
                "johnsmith@gmail.com",
                "password");
        adminService.registerAdmin(admin);

        mockMvc.perform(MockMvcRequestBuilders
                        .put("/admin/{id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .param("firstName", "daniel")
                        .param("lastName", "darcy")
                        .param("email", "danieldarcy@gmail.com")
                        .param("password", "elizabeth123"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void updateAdminFailsWhenRequestParamIdIsNotGiven() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/admin/{id}", "{}")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}