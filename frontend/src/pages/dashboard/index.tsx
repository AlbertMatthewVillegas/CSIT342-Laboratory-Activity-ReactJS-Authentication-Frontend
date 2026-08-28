import { ServiceRequest } from "../../dto/serviceRequest";
import { ServiceEntity } from "../../entities/ServiceEntity";
import useService from "../../hooks/service";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const service = useService();
    if (!service.token) {
        navigate("/login", { replace: true });
        return null;
    }
    return (
        <div className="min-h-screen text-black bg-gray-50">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <header className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-500">
                        Welcome back
                    </p>
                    <div className="flex items-center justify-between gap-4 mt-2">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Dashboard
                        </h1>
                        <a 
                            href="/" 
                            onClick={(e) => {
                                e.preventDefault();
                                service.logout();
                                navigate('/', { replace: true });
                            }}
                            className="text-sm font-semibold text-red-600 hover:underline"
                        >
                            Logout
                        </a>
                    </div>
                </header>

                <main className="space-y-10">
                    {(service.message || service.error) && <p className={service.error ? "text-red-600" : "text-green-600"}>{service.error || service.message}</p>}
                    <CreateRequest request={service.request} handleChange={service.handleChange} createRequest={service.createRequest} />
                    <DisplayRequests requests={service.requests} updateRequest={service.updateRequest} deleteRequest={service.deleteRequest} />
                </main>
            </div>
        </div>
    );
}

export default Dashboard;

function CreateRequest({ request, createRequest, handleChange }: Pick<ReturnType<typeof useService>, "request" | "createRequest" | "handleChange">) {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createRequest();
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Create Service Request
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={request?.title || ""}
                        onChange={handleChange}
                        placeholder="Enter service title"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={request?.description || ""}
                        onChange={handleChange}
                        placeholder="Provide details about your request..."
                        rows={4}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        value={request?.category || ""}
                        onChange={handleChange}
                        placeholder="e.g., IT Support, Maintenance"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 cursor-pointer"
                >
                    Create Request
                </button>
            </form>
        </div>
    );
}

function DisplayRequests({ requests, updateRequest, deleteRequest }: Pick<ReturnType<typeof useService>, "requests" | "updateRequest" | "deleteRequest">) {

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                My Service Requests
            </h2>

            {requests.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No service requests found.</p>
            ) : (
                requests.map((req) => (
                    <RequestCard key={req.id} request={req} updateRequest={updateRequest} deleteRequest={deleteRequest} />
                ))
            )}
        </div>
    );
}

function RequestCard({ request, updateRequest, deleteRequest }: { request: ServiceEntity; updateRequest: ReturnType<typeof useService>["updateRequest"]; deleteRequest: ReturnType<typeof useService>["deleteRequest"] }) {
    return (
        <div className="border-b border-gray-200 py-4 last:border-none">
            <h3 className="text-lg font-semibold text-gray-800">{request.title}</h3>
            <p className="text-xs text-gray-500">ID: {request.id}</p>
            <p className="text-sm text-blue-600 font-medium mb-1">Category: {request.category}</p>
            <p className="mt-1 text-gray-600">{request.description}</p>
            <p className="text-xs text-gray-500">Created: {request.dateCreated ? new Date(request.dateCreated).toLocaleString() : "Unknown"}</p>
            <p className="text-xs text-gray-500">Created by: {typeof request.createdBy === "string" ? request.createdBy : request.createdBy?.email}</p>
            <div>
                <h1> Update Request </h1>
                <UpdateRequestForm request={request} updateRequest={updateRequest} />
                <h1> Delete Request </h1>
                <DeleteRequestButton requestId={request.id!} deleteRequest={deleteRequest} />
            </div>
        </div>
    );
}

function DeleteRequestButton({ requestId, deleteRequest }: { requestId: string; deleteRequest: ReturnType<typeof useService>["deleteRequest"] }) {
    const handleDelete = () => {
        deleteRequest(requestId);
    };

    return (
        <button
            onClick={handleDelete}
            className="mt-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 cursor-pointer"
        >
            Delete Request
        </button>
    );
}

function UpdateRequestForm({ request, updateRequest }: { request: ServiceEntity; updateRequest: ReturnType<typeof useService>["updateRequest"] }) {
    const [updatedRequest, setUpdatedRequest] = useState<ServiceRequest>({
        title: request.title,
        description: request.description,
        category: request.category,
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedRequest(prev => ({ ...prev, [name]: value } as ServiceRequest));
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateRequest(request.id!, updatedRequest);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
            <input
                type="text"
                name="title"
                value={updatedRequest.title}
                onChange={handleChange}
                placeholder="Update title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <textarea
                name="description"
                value={updatedRequest.description}
                onChange={handleChange}
                placeholder="Update description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            ></textarea>        
            <input
                type="text"
                name="category"
                value={updatedRequest.category}
                onChange={handleChange}
                placeholder="Update category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />      
            <button
                type="submit"
                className="mt-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 cursor-pointer"
            >
                Update Request
            </button>
        </form>
    );
}