const API_URL = "http://localhost:3000/auth";

export async function register(body) {
    const res = await fetch(API_URL + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Failed to create register");
    }
    return res.json();
}

export async function login(body) {
    const res = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Login Failed");
    }
    return res.json();
}

export async function logout() {
    const res = await fetch(API_URL + "/logout", {
        method: "POST",
        credentials: "include",
    });
    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Logout Failed");
    }
    return res.json();
}

export async function getMe() {
    const res = await fetch(API_URL + "/me", {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Failed to fetch user");
    }
    return res.json();
}
