import { ChangeEvent, useEffect, useState } from "react";
import { requestService } from "../../services/servicesService";
import { ServiceEntity } from "../../entities/ServiceEntity";
import { useUser } from "../user/hook";
import { ServiceRequest } from "../../dto/serviceRequest";

function useService() {
    const [requests, setRequests] = useState<ServiceEntity[]>([]);
    const [request, setRequest] = useState<ServiceRequest | null>(null);
    const { token } = useUser();
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                
                const response = await requestService.getMyRequests(token!);
                setRequests(response.entities);
                console.log("Fetched service requests:", response.entities);
                console.log("Token used for fetching:", token);
            } catch (error) {
                console.error("Failed to fetch service requests:", error);
            }
        };

        fetchRequests();
    }, []);

    const createRequest = async () => {
        if (!request) return;

        try {
            console.log(token)
            const response = await requestService.createRequest(request, token!);
            setRequests(prev => [...prev, response.entity]);
            setRequest(null); // Reset the form after successful creation
        } catch (error) {
            console.error("Failed to create service request:", error);
            setRequest(null); // Reset the form after successful creation
        }
    };

    const updateRequest = async (id: string, newRequest: ServiceRequest) => {
        if (!request) return;
        
        try {
            const response = await requestService.updateRequest(id, newRequest, token!);
            setRequest(null); // Reset the form after successful creation
        } catch (error) {
            console.error("Failed to update service request:", error);
            setRequest(null); // Reset the form after successful creation
        }
    };

    const deleteRequest = async (id: string) => {
        try {
            await requestService.deleteRequest(id, token!);
            setRequests(prev => prev.filter(req => req.id !== id));
            
            setRequest(null); // Reset the form after successful creation
        } catch (error) {
            console.error("Failed to delete service request:", error);
            
            setRequest(null); // Reset the form after successful creation
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
    };
}

export default useService;