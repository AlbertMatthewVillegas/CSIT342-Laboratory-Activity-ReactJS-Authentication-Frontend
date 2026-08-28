package edu.cit.villegas.activity01.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "service_request")
@Data
@NoArgsConstructor
public class ServiceEntity {
	@Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
	private String title; 
    private String description;
	private String category;

    @CreationTimestamp
	private LocalDateTime dateCreated;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_by", nullable = false)
	private UserEntity createdBy;

	public ServiceEntity(String title, String description, String category, UserEntity createdBy) {
		this.title = title; 
        this.description = description; 
        this.category = category;
		this.createdBy = createdBy; 
	}
}