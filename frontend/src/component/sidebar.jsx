import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../auth/useAuth";

export default function Sidebar() {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    async function handleLogout() {
        await logoutUser();
        navigate("/login");
    }

    return (
        <aside className="sidebar">
            <nav>
                <NavLink className="sidebar-link" to="/">
                    Dashboard
                </NavLink>
                <NavLink className="sidebar-link" to="/users">
                    User
                </NavLink>
                <NavLink className="sidebar-link" to="/register">
                    Register
                </NavLink>
                <NavLink className="sidebar-link" to="/login">
                    Login
                </NavLink>
            </nav>
            <div className="sidebar-footer">
                <Button
                    onClick={handleLogout}
                    className="w-full border-white"
                    variant="ghost"
                >
                    Logout
                </Button>
            </div>
        </aside>
    );
}
