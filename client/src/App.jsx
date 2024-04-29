import { Routes, Route } from "react-router-dom";
import MainDashboard from "./pages/dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/dashboard" element={<MainDashboard />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </>
    );
}

export default App;
