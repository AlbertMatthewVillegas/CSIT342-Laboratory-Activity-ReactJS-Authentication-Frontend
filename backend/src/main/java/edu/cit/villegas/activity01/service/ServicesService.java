package edu.cit.villegas.activity01.service;

import edu.cit.villegas.activity01.dto.ServiceRequest;
import edu.cit.villegas.activity01.entity.ServiceEntity;
import edu.cit.villegas.activity01.entity.UserEntity;
import edu.cit.villegas.activity01.exception.UserDoesNotExistException;
import edu.cit.villegas.activity01.repository.ApiRepository;
import edu.cit.villegas.activity01.repository.ServicesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ServicesService {

    private final ServicesRepository requests;
    private final ApiRepository users;

    public ServicesService(ServicesRepository requests, ApiRepository users) {
        this.requests = requests;
        this.users = users;
    }

    public List<ServiceEntity> getMine(UUID userId) {
        return requests.findAllByCreatedBy(currentUser(userId));
    }

    public List<ServiceEntity> getMine(UUID id, UUID userId) {
        if (!userId.equals(id)) {
            throw new UserDoesNotExistException("user does not match the authenticated user");
        }
        return requests.findAllByCreatedBy(currentUser(userId));
    }

    public ServiceEntity create(ServiceRequest input, UUID userId) {
        return requests.save(new ServiceEntity(
                input.getTitle(),
                input.getDescription(),
                input.getCategory(),
                currentUser(userId)
        ));
    }

    public ServiceEntity update(UUID id, ServiceRequest input, UUID userId) {
        ServiceEntity entity = owned(id, userId);
        entity.setTitle(input.getTitle());
        entity.setDescription(input.getDescription());
        entity.setCategory(input.getCategory());
        return requests.save(entity);
    }

    public void delete(UUID id, UUID userId) {
        requests.delete(owned(id, userId));
    }

    private UserEntity currentUser(UUID userId){
        return users.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistException("user with id: " + userId + " does not exist"));
    }

    private ServiceEntity owned(UUID id, UUID userId){
        UserEntity user = currentUser(userId);
        return requests.findByIdAndCreatedBy(id, user)
                .orElseThrow(() -> new UserDoesNotExistException(
                        "service request with id: " + id + " does not exist or is not owned by the current user"));
    }
}