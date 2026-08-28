package edu.cit.villegas.activity01.controller;

import edu.cit.villegas.activity01.dto.*;
import edu.cit.villegas.activity01.entity.ServiceEntity;
import edu.cit.villegas.activity01.exception.UserDoesNotExistException;
import edu.cit.villegas.activity01.service.ServicesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/requests")
public class ServicesController {

    private final ServicesService service;

    public ServicesController(ServicesService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ResponseDTO<ServiceEntity>> create(
            @RequestBody ServiceRequest request, 
            @AuthenticationPrincipal UUID userId
    ) {
        return ResponseEntity.ok(new ResponseDTO<>(
                "service request created", 
                service.create(request, userId)
        ));
    }

    @GetMapping
    public ResponseEntity<ListResponseDTO<ServiceEntity>> getMine(
        @AuthenticationPrincipal UUID userId
    ) {
        return ResponseEntity.ok(new ListResponseDTO<>(
                "service requests fetched", 
                service.getMine(userId)
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<ServiceEntity>> get(
            @PathVariable UUID id, 
            @AuthenticationPrincipal UUID userId
    ) {
        return ResponseEntity.ok(new ResponseDTO<>(
                "service request fetched", 
                service.getMine(id, userId)
        ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<ServiceEntity>> update(
            @PathVariable UUID id, 
            @RequestBody ServiceRequest request, 
            @AuthenticationPrincipal UUID userId
    ) {
        return ResponseEntity.ok(new ResponseDTO<>(
                "service request updated", 
                service.update(id, request, userId)
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO<Void>> delete(
            @PathVariable UUID id, 
            @AuthenticationPrincipal UUID userId
    ) {
        service.delete(id, userId);
        return ResponseEntity.ok(new ResponseDTO<>("service request deleted", null));
    }

    @ExceptionHandler(UserDoesNotExistException.class)
    public ResponseEntity<String> notFound(UserDoesNotExistException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
}