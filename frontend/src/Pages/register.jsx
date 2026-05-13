import { useState } from "react";
import { register } from "../Services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "User",
    });
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            await register(form);
            setForm({
                name: "",
                email: "",
                password: "",
                role: "User",
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <Input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    style={{
                        background: "white",

                        padding: "8px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                    }}
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>

                <Button type="submit" disabled={submitting}>
                    {submitting ? "Signing up..." : "Sign UP"}
                </Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
