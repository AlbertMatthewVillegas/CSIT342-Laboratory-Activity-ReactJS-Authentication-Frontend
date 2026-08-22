package edu.cit.villegas.activity01.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
}
