import { Routes, Route } from "react-router-dom";
import MainDashboard from "./pages/dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import AIChat from "./components/aiChat/AIChat";
import SettingsMenu from "./components/sidemenu/SettingsMenu";
import MobileMenuBar from "./components/sidemenu/MobileMenuBar";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/dashboard" element={<MainDashboard />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/aichat" element={<AIChat />} />
                <Route path="/settings" element={<SettingsMenu />} />
            </Routes>
            <MobileMenuBar />
        </div>
    );
}

export default App;
