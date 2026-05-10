import { useEffect, useState } from "react";
import {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
} from "../Services/userService";

export default function Page1() {
    const [users, setUsers] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const [editingUserId, setEditingUserId] = useState(null);

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
    async function handleUpdate(id, email) {
        try {
            await updateUser(id, email);
            const data = await getUsers();
            setUsers(data);
            setNewEmail("");
        } catch (err) {
            setError(err.message);
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
                            {user.role}
                            {editingUserId === user.id ? (
                                <>
                                    <input
                                        style={{
                                            marginLeft: 10,
                                            background: "white",
                                            color: "black",
                                        }}
                                        value={newEmail}
                                        onChange={(e) =>
                                            setNewEmail(e.target.value)
                                        }
                                    ></input>
                                    <button
                                        style={{
                                            background: "white",
                                            marginLeft: 8,
                                            padding: "4px 8px",
                                            border: "1px solid #2f9440",
                                            borderRadius: 4,
                                            color: "#0c4927",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handleUpdate(user.id, newEmail)
                                        }
                                    >
                                        Update
                                    </button>
                                    <button
                                        style={{
                                            background: "white",
                                            marginLeft: 8,
                                            padding: "4px 8px",
                                            border: "1px solid #2f9440",
                                            borderRadius: 4,
                                            color: "#0c4927",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => setEditingUserId(null)}
                                    >
                                        Hide Edit button
                                    </button>
                                </>
                            ) : (
                                <button
                                    style={{
                                        background: "white",
                                        marginLeft: 8,
                                        padding: "4px 8px",
                                        border: "1px solid #2f9440",
                                        borderRadius: 4,
                                        color: "#0c4927",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setEditingUserId(user.id)}
                                >
                                    ShowEdit
                                </button>
                            )}
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
