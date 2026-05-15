import { useEffect, useState } from "react";
import {
    createUser,
    deleteUser,
    getProducts,
    updateUser,
} from "../Services/productsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <>
            <h1>Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <ul>
                    {products.map((p) => (
                        <li key={p.id}>
                            {p.name} - ${p.price}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
