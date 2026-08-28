package edu.cit.villegas.activity01.service;

import edu.cit.villegas.activity01.dto.LoginRequest;
import edu.cit.villegas.activity01.dto.RegisterRequest;
import edu.cit.villegas.activity01.entity.UserEntity;
import edu.cit.villegas.activity01.exception.UserAlreadyExistsException;
import edu.cit.villegas.activity01.exception.UserDoesNotExistException;
import edu.cit.villegas.activity01.repository.ApiRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ApiService {
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();;
    private ApiRepository repository;
    private JwtService jwtService;
    public ApiService(
            ApiRepository repository,
            JwtService jwtService
    ) {
        this.repository = repository;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request){
        UserEntity existingUser = repository.findByEmail(request.getEmail());
        if(existingUser != null) {
            throw new UserAlreadyExistsException();
        }
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        UserEntity newUser = repository.save(new UserEntity(
                request.getUsername(),
                request.getEmail(),
                hashedPassword
        ));

        return jwtService.generateToken(newUser.getUserId().toString());
    }

    public String login(LoginRequest request){
        UserEntity existingUser = repository.findByEmail(request.getEmail());
        if(existingUser == null){
            throw new UserDoesNotExistException();
        }

        Boolean isValid = passwordEncoder.matches(request.getPassword(), existingUser.getPassword());
        if (!isValid) throw new UserDoesNotExistException("password not valid");
        return jwtService.generateToken(existingUser.getUserId().toString());
    }

    public UserEntity getUser(UUID id) {
        return repository.findById(id).orElseThrow(() -> new UserDoesNotExistException("user with id: " + id + "does not exist"));
    }


}
