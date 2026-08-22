package edu.cit.villegas.activity01.controller;

import edu.cit.villegas.activity01.dto.LoginRequest;
import edu.cit.villegas.activity01.dto.RegisterRequest;
import edu.cit.villegas.activity01.dto.ResponseDTO;
import edu.cit.villegas.activity01.entity.UserEntity;
import edu.cit.villegas.activity01.exception.UserAlreadyExistsException;
import edu.cit.villegas.activity01.exception.UserDoesNotExistException;
import edu.cit.villegas.activity01.service.ApiService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ApiController {

    private ApiService service;

    public ApiController(
            ApiService service
    ) {
        this.service = service;
    }
    @PostMapping("/register")
    public ResponseEntity<ResponseDTO<UserEntity>> register(
            @RequestBody RegisterRequest request
    ){
        UserEntity user = service.register(request);
        ResponseDTO<UserEntity> response = new ResponseDTO<>("successfully registered  user",user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO<UserEntity>> login(
            @RequestBody LoginRequest request
    ){
        UserEntity user = service.login(request);
        ResponseDTO<UserEntity> response = new ResponseDTO<>("successfully logged in user",user);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<UserEntity>> getUser(
            @PathVariable UUID id
    ) {
        UserEntity user = service.getUser(id);
        ResponseDTO<UserEntity> response = new ResponseDTO<>("successfully fetched user with id: " + id,user);
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }

    @ExceptionHandler(UserDoesNotExistException.class)
    public ResponseEntity<String> handleUserDoesNotExist(UserDoesNotExistException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
