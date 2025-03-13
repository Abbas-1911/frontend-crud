const API_URL = "https://backend-crud-production-4aae.up.railway.app/api";

export const GET = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const POST = async (project) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
    });
    return response.json();
};

export const PUT = async (id, project) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
    });
    return response.json();
};

export const PATCH = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    return response.json();
};


export const DELETE = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
