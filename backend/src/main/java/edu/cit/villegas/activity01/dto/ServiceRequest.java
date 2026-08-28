package edu.cit.villegas.activity01.dto;

import lombok.Data;

@Data
public class ServiceRequest {
	private String title;
	private String description;
	private String category;
    private String createdBy;
}