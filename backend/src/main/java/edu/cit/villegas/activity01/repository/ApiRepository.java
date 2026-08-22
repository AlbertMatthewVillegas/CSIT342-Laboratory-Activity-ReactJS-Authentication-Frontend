package edu.cit.villegas.activity01.repository;


import edu.cit.villegas.activity01.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ApiRepository extends JpaRepository<UserEntity, UUID> {

    UserEntity findByEmail(String email);
    @Override
    Optional<UserEntity> findById(UUID uuid);
}
