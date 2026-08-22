package edu.cit.villegas.activity01.exception;

public class UserDoesNotExistException extends RuntimeException {
    public UserDoesNotExistException () {
        super("User does not exist!");
    }

    public UserDoesNotExistException (Throwable cause) {
        super(cause);
    }

    public UserDoesNotExistException (String message) {
        super(message);
    }


}
