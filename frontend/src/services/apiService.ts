import { UserEntity } from "../entities/UserEntity";
import { Response } from "../dto/response";
import { RegisterRequest } from "../dto/registerRequest";
import { LoginRequest } from "../dto/loginRequest";

export const apiService = {
    register: async (request: RegisterRequest): Promise<Response<UserEntity>> => {
        const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        });
        if(!response.ok)
            throw new Error("user already exists")
        return response.json();
    },

    login: async (request: LoginRequest): Promise<Response<UserEntity>> => {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if(!response.ok)
            throw new Error("invalid email or password")
        return response.json();
    },

    getUserById: async (id: string): Promise<Response<UserEntity>> => {
        const response = await fetch(`http://localhost:8080/api/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    }
};

