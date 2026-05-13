import { useEffect, useState } from "react";
import {
    createUser,
    deleteUser,
    getUsers,
    updateUser,
} from "../Services/userService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
                <Input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-auto"
                />

                <Input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-auto"
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
                    {submitting ? "Saving..." : "Create User"}
                </Button>
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
                                    <Input
                                        className="ml-2.5 inline-flex w-48"
                                        value={newEmail}
                                        onChange={(e) =>
                                            setNewEmail(e.target.value)
                                        }
                                    />
                                    <Button
                                        className="ml-2"
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            handleUpdate(user.id, newEmail)
                                        }
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        className="ml-2"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setEditingUserId(null)}
                                    >
                                        Hide Edit button
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    className="ml-2"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingUserId(user.id)}
                                >
                                    ShowEdit
                                </Button>
                            )}
                            <Button
                                className="ml-2"
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
