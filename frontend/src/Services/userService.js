const API_URL = "http://localhost:3000/users";

export async function getUsers() {
    const res = await fetch(API_URL);
    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message);
    }

    return res.json();
}

export async function createUser(body) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Failed to create user");
    }
    return res.json();
}

export async function deleteUser(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!res.ok) {
        throw new Error("Failed to delete user");
    }
    return res.json();
}

export async function updateUser(id, email) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
    });
    if (!res.ok) {
        throw new Error("Failed Update User");
    }
    return;
}
