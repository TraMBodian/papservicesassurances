package com.assurance.sante.connect.controller;

import com.assurance.sante.connect.dto.LoginRequest;
import com.assurance.sante.connect.dto.AuthResponse;
import com.assurance.sante.connect.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testLoginEndpoint() throws Exception {
        mockMvc.perform(post("/api/auth/login")
            .contentType("application/json")
            .content("{\"email\":\"test@example.com\",\"password\":\"password\"}"))
            .andExpect(status().isUnauthorized());
    }
}
