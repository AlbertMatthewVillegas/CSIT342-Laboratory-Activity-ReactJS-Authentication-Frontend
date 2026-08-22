package edu.cit.villegas.activity01.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDTO<T> {
    private String message;
    private T entity;
}
