package edu.cit.villegas.activity01.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ListResponseDTO<T> {
	private String message;
	private List<T> entities;
}
