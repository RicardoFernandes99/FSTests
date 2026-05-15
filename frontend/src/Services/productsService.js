const API_URL = "http://localhost:3000/products";

export async function getProducts() {
    const res = await fetch(API_URL, {
        credentials: "include",
    });
    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message);
    }

    return res.json();
}
