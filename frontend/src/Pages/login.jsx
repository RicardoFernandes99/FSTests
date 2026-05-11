import { useEffect, useState } from "react";
import { login, register } from "../Services/authService";

export default function LoginPage() {
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(true);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const created = await login(form);
            setForm({
                email: "",
                password: "",
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    style={{
                        background: "white",
                        padding: "8px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={form.password}
                    onChange={handleChange}
                    style={{
                        background: "white",
                        padding: "8px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: "white",
                        padding: "8px 12px",
                        border: "1px solid #222",
                        borderRadius: 4,
                        cursor: "pointer",
                    }}
                >
                    Sign In
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
