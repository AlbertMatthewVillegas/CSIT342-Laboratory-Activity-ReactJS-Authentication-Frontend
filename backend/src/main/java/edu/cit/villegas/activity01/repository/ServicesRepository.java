package edu.cit.villegas.activity01.repository;

import edu.cit.villegas.activity01.entity.ServiceEntity;
import edu.cit.villegas.activity01.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ServicesRepository extends JpaRepository<ServiceEntity, UUID> {
	List<ServiceEntity> findAllByCreatedBy(UserEntity user);
	Optional<ServiceEntity> findByIdAndCreatedBy(UUID id, UserEntity user);
}
