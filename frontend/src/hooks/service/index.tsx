import { ChangeEvent, useEffect, useState } from "react";
import { requestService } from "../../services/servicesService";
import { ServiceEntity } from "../../entities/ServiceEntity";
import { useUser } from "../user/hook";
import { ServiceRequest } from "../../dto/serviceRequest";

function useService() {
    const [requests, setRequests] = useState<ServiceEntity[]>([]);
    const [request, setRequest] = useState<ServiceRequest>({ title: "", description: "", category: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { token, setToken } = useUser();
    useEffect(() => {
        const fetchRequests = async () => {
            if (!token) return;

            try {
                const response = await requestService.getMyRequests(token);
                setRequests(response.entities);
                setError("");
            } catch (error) {
                console.error("Failed to fetch service requests:", error);
                setError("Unable to load your service requests.");
            }
        };

        fetchRequests();
    }, [token]);

    const createRequest = async () => {
        try {
            const response = await requestService.createRequest(request, token!);
            setRequests(prev => [...prev, response.entity]);
            setRequest({ title: "", description: "", category: "" });
            setMessage("Service request created successfully.");
            setError("");
        } catch (error) {
            console.error("Failed to create service request:", error);
            setError("Unable to create the service request.");
        }
    };

    const updateRequest = async (id: string, newRequest: ServiceRequest) => {
        try {
            const response = await requestService.updateRequest(id, newRequest, token!);
            setRequests(prev => prev.map(item => item.id === id ? response.entity : item));
            setMessage("Service request updated successfully.");
            setError("");
        } catch (error) {
            console.error("Failed to update service request:", error);
            setError("Unable to update the service request.");
        }
    };

    const deleteRequest = async (id: string) => {
        try {
            await requestService.deleteRequest(id, token!);
            setRequests(prev => prev.filter(req => req.id !== id));
            setMessage("Service request deleted successfully.");
            setError("");
        } catch (error) {
            console.error("Failed to delete service request:", error);
            setError("Unable to delete the service request.");
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRequest(prev => ({ ...prev, [name]: value } as ServiceRequest));
    }

    return {
        requests,
        request,
        createRequest,
        handleChange,
        deleteRequest,
        updateRequest,
        message,
        error,
        logout: () => {
            setToken(null);
        },
        token,
    };
}

export default useService;