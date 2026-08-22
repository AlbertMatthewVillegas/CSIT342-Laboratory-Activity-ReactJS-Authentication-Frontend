package edu.cit.villegas.activity01.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(){
        super("User already exists!");
    }
}
