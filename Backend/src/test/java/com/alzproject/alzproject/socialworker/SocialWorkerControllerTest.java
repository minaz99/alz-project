package com.alzproject.alzproject.socialworker;

import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@WebMvcTest(SocialWorker.class)
class SocialWorkerControllerTest {
//    @MockBean
//    private SocialWorkerService socialWorkerService;
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Test
//    void getActiveSocialWorkersWhenSocialWorkersAreCorrect() throws Exception {
//        SocialWorker socialWorker = new SocialWorker(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "lat:23-lng:14");
//        socialWorkerService.registerSocialWorker(socialWorker);
//        socialWorkerService.activateSocialWorker(socialWorker.getId());
//        List<SocialWorker> allSocialWorkers = Arrays.asList(socialWorker);
//        given(socialWorkerService.getActiveSocialWorkers()).willReturn(allSocialWorkers);
//
//        mockMvc.perform(get("/social-worker/active")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void getNotActivatedSocialWorkersWhenSocialWorkersAreCorrect() throws Exception {
//        SocialWorker socialWorker = new SocialWorker(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "lat:23-lng:14");
//        socialWorkerService.registerSocialWorker(socialWorker);
//        List<SocialWorker> allSocialWorkers = Arrays.asList(socialWorker);
//        given(socialWorkerService.getActiveSocialWorkers()).willReturn(allSocialWorkers);
//
//        mockMvc.perform(get("/social-worker/notActivated")
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void getSocialWorkerSucceedsWhenRequestParamIdExists() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                        .get("/social-worker/{id}", 1L)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void getSocialWorkerFailsWhenRequestParamIdIsEmpty() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                        .get("/social-worker/{id}", "{}")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    void registerSocialWorkerSucceedsWhenRequestBodyIsValid() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                    .post("/social-worker")
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .content("{\n" +
//                            "    \"firstName\" : \"mike\",\n" +
//                            "    \"lastName\" : \"blake\",\n" +
//                            "    \"email\" : \"mikeblake23@gmail.com\",\n" +
//                            "    \"password\" : \"password\",\n" +
//                            "    \"dateOfBirth\" : \"1982-03-02\",\n" +
//                            "    \"gender\" : \"MALE\",\n" +
//                            "    \"phoneNumber\" : \"123456789\",\n" +
//                            "    \"addressId\" : \"Pl. Politechniki 1, 00-661 Warszawa\",\n" +
//                            "    \"coordinates\" : \"lat:23-lng:14\"\n" +
//                            "}"))
//            .andDo(print())
//            .andExpect(status().isOk());
//    }
//
//    @Test
//    void registerSocialWorkerFailsWhenRequestBodyIsEmpty() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/social-worker")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content("")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    void deleteSocialWorkerSucceedsWhenRequestParamIdExists() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                        .delete("/social-worker/{id}", 1L)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void deleteSocialWorkerFailsWhenRequestParamIdIsEmpty() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                        .delete("/social-worker/{id}", "{}")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    void activateSocialWorkerSucceedsWhenRequestParamIdExists() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                        .put("/social-worker/activate/{id}", 1L)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void activateSocialWorkerSucceedsWhenRequestParamIdIsNotGiven() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                        .put("/social-worker/activate/{id}", "{}")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void updateSocialWorkerSucceedsWhenFirstAndLastNameGiven() throws Exception {
//        SocialWorker socialWorker = new SocialWorker(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "lat:23-lng:14");
//        socialWorkerService.registerSocialWorker(socialWorker);
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .put("/social-worker/{id}", 1L)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .param("firstName", "jackie")
//                        .param("lastName", "charles"))
//                .andDo(print())
//                .andExpect(status().isOk()
//                );
//    }
//
//    @Test
//    void updateSocialWorkerSucceedsWhenFirstAndLastNameEmpty() throws Exception {
//        SocialWorker socialWorker = new SocialWorker(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "lat:23-lng:14");
//        socialWorkerService.registerSocialWorker(socialWorker);
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .put("/social-worker/{id}", 1L)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .param("firstName", "")
//                        .param("lastName", ""))
//                .andDo(print())
//                .andExpect(status().isOk()
//                );
//    }
//
//    @Test
//    void updateSocialWorkerSucceedsWhenMultipleRequestParamsAreProvided() throws Exception {
//        SocialWorker socialWorker = new SocialWorker(
//                "john",
//                "smith",
//                "johnsmith@gmail.com",
//                "password",
//                LocalDate.of(1982, 3, 2),
//                Gender.MALE,
//                "123456789",
//                "Pl. Politechniki 1, 00-661 Warszawa",
//                "lat:23-lng:14");
//        socialWorkerService.registerSocialWorker(socialWorker);
//
//        mockMvc.perform(MockMvcRequestBuilders
//                        .put("/social-worker/{id}", 1L)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .param("firstName", "daniel")
//                        .param("lastName", "darcy")
//                        .param("email", "danieldarcy@gmail.com")
//                        .param("password", "elizabeth123")
//                        .param("phoneNumber", "222333888"))
//                .andDo(print())
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void updateSocialWorkerFailsWhenRequestParamIdIsNotGiven() throws Exception {
//        mockMvc.perform(MockMvcRequestBuilders
//                        .put("/social-worker/{id}", "{}")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isBadRequest());
//    }
}