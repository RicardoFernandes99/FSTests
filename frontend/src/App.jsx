import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Page1 from "./Pages/page1";
import MainPage from "./Pages/mainPage";
import Sidebar from "./component/sidebar";

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <Sidebar />

                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/users" element={<Page1 />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
