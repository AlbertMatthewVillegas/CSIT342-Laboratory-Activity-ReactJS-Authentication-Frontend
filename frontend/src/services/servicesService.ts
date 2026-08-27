import { ServiceEntity } from "../entities/ServiceEntity";
import { Response } from "../dto/response";
import { ListResponse } from "../dto/listResponse";
import { ServiceRequest } from "../dto/serviceRequest";

// Helper function to get authorization headers with JWT token
const getAuthHeaders = (token: string): HeadersInit => {
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

export const requestService = {
    // POST /api/requests - Create a new service request
    createRequest: async (request: ServiceRequest, token: string): Promise<Response<ServiceEntity>> => {
        const response = await fetch('http://localhost:8080/api/requests', {
            method: 'POST',
            headers: getAuthHeaders(token),
            body: JSON.stringify(request),
        });
        if (!response.ok)
            throw new Error("Failed to create service request");
        return response.json();
    },

    // GET /api/requests - View all service requests belonging to the logged-in user
    getMyRequests: async (token: string): Promise<ListResponse<ServiceEntity>> => {
        const response = await fetch('http://localhost:8080/api/requests', {
            method: 'GET',
            headers: getAuthHeaders(token),
        });
        if (!response.ok)
            throw new Error("Failed to fetch service requests");
        return response.json();
    },

    // GET /api/requests/{id} - View a specific service request
    getRequestById: async (id: string, token: string): Promise<Response<ServiceEntity>> => {
        const response = await fetch(`http://localhost:8080/api/requests/${id}`, {
            method: 'GET',
            headers: getAuthHeaders(token),
        });
        if (!response.ok)
            throw new Error(`Failed to fetch service request with id: ${id}`);
        return response.json();
    },

    // PUT /api/requests/{id} - Update a specific service request
    updateRequest: async (id: string, request: Partial<ServiceEntity>, token: string): Promise<Response<ServiceEntity>> => {
        const response = await fetch(`http://localhost:8080/api/requests/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(token),
            body: JSON.stringify(request),
        });
        if (!response.ok)
            throw new Error(`Failed to update service request with id: ${id}`);
        return response.json();
    },

    // DELETE /api/requests/{id} - Delete a specific service request
    deleteRequest: async (id: string, token: string): Promise<Response<void>> => {
        const response = await fetch(`http://localhost:8080/api/requests/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(token),
        });
        if (!response.ok)
            throw new Error(`Failed to delete service request with id: ${id}`);
        return response.json();
    }
};