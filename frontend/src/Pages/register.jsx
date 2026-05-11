import { useEffect, useState } from "react";
import { register } from "../Services/authService";

export default function RegisterPage() {
    const [users, setUsers] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const [editingUserId, setEditingUserId] = useState(null);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "User",
    });
    const [loading, setLoading] = useState(true);
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
            const created = await register(form);
            setUsers((prev) => [created, ...prev]);
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
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    style={{
                        background: "white",
                        padding: "8px 10px",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                    }}
                />

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
                    Sign UP
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
