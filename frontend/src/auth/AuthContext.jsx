import { useEffect, useState } from "react";
import { getMe, logout } from "../Services/authService";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function checkAuth() {
        try {
            const me = await getMe();
            setUser(me);
            return me;
        } catch {
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }

    async function logoutUser() {
        await logout();
        setUser(null);
    }

    useEffect(() => {
        let isMounted = true;

        getMe()
            .then((me) => {
                if (isMounted) {
                    setUser(me);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setUser(null);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: Boolean(user),
                checkAuth,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
