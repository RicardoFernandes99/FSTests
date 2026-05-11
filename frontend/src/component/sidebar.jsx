import { NavLink } from "react-router-dom";

export default function Sidebar() {
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
        </aside>
    );
}
