import { useState } from "react";
import { login } from "../Services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function LoginPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
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
            await login(form);
            await checkAuth();
            navigate("/");
            setForm({
                email: "",
                password: "",
            });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <Button type="submit">Sign In</Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
