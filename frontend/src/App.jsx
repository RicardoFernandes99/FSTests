import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Page1 from "./Pages/page1";
import LoginPage from "./Pages/login";
import MainPage from "./Pages/mainPage";
import Sidebar from "./component/sidebar";
import RegisterPage from "./Pages/register";
import ProtectedRoute from "./component/ProtectedRoute";
import GuestRoute from "./component/GuestRoute";
import { AuthProvider } from "./auth/AuthContext";
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="app-layout">
                    <Sidebar />
                    <main>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <MainPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/register"
                                element={
                                    <GuestRoute>
                                        <RegisterPage />
                                    </GuestRoute>
                                }
                            />
                            <Route
                                path="/users"
                                element={
                                    <ProtectedRoute>
                                        <Page1 />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <GuestRoute>
                                        <LoginPage />
                                    </GuestRoute>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
