import { useEffect, useState } from "react";
import { createUser, deleteUser, getUsers } from "./Services/userService";

function App() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "User",
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUsers() {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

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
            const created = await createUser(form);
            setUsers((prev) => [created, ...prev]);
            setForm({
                name: "",
                email: "",
                role: "User",
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteUser(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div
            style={{
                maxWidth: 700,
                margin: "40px auto",
                padding: "0 16px",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1>Users Test App</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 24,
                    flexWrap: "wrap",
                }}
            >
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
                    disabled={submitting}
                    style={{
                        background: "white",
                        padding: "8px 12px",
                        border: "1px solid #222",
                        borderRadius: 4,
                        cursor: "pointer",
                    }}
                >
                    {submitting ? "Saving..." : "Create User"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? (
                <p>Loading users...</p>
            ) : users.length === 0 ? (
                <p>No users yet.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} style={{ marginBottom: 8 }}>
                            <strong>{user.name}</strong> - {user.email} -{" "}
                            {user.role}{" "}
                            <button
                                onClick={() => handleDelete(user.id)}
                                style={{
                                    background: "white",
                                    marginLeft: 8,
                                    padding: "4px 8px",
                                    border: "1px solid #b91c1c",
                                    borderRadius: 4,
                                    color: "#b91c1c",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
