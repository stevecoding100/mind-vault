import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import MainDashboard from "./pages/dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import AIChat from "./components/aiChat/AIChat";
import SettingsMenu from "./components/sidemenu/SettingsMenu";
import MobileMenuBar from "./components/sidemenu/MobileMenuBar";
import SideMenu from "./components/sidemenu/SideMenu";
import NavBar from "./components/navBar/NavBar";
import { useDisclosure } from "@nextui-org/react";
import ideaAPI from "../utils/ideaAPI";

function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState(localStorage.getItem("name") || null);
    const [userName, setUserName] = useState(
        localStorage.getItem("userName") || null
    );
    const [userId, setUserId] = useState(
        localStorage.getItem("userId") || null
    );
    const [loadingIdeas, setLoadingIdeas] = useState(true);
    const [error, setError] = useState(null);
    const [ideas, setIdeas] = useState([]);
    const isAuthenticated = !!localStorage.getItem("token");

    const navigate = useNavigate();
    const location = useLocation();

    // Define routes where SideMenu should be hidden
    const hideSideMenuRoutes = ["/", "/signup"];

    // Check if the current route should hide the SideMenu
    const shouldHideSideMenu = hideSideMenuRoutes.includes(location.pathname);

    // Getting all ideas
    const fetchIdeas = async () => {
        if (!userId) {
            setLoadingIdeas(false);
            return;
        }
        try {
            const userIdeas = await ideaAPI.idea.getAllIdeas(userId);
            setIdeas(userIdeas);
            setLoadingIdeas(false);
        } catch (error) {
            setError(error.message);
            setLoadingIdeas(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && userId) {
            fetchIdeas();
        }
    }, [isAuthenticated, userId]);

    const handleSignOut = () => {
        // Clear user authentication data from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("userName");
        setName(null);
        setUserName(null);
        setUserId(null);
        setIdeas([]);
        navigate("/");
    };

    return (
        <div className="flex flex-col h-full">
            {isAuthenticated && !shouldHideSideMenu && (
                <NavBar name={name} userName={userName} ideas={ideas} />
            )}
            <div className="relative flex flex-col lg:flex-row  w-full h-full">
                {/* Render SideMenu only if it should not be hidden */}
                {isAuthenticated && !shouldHideSideMenu && (
                    <SideMenu onOpen={onOpen} />
                )}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LoginPage
                                setName={setName}
                                setUserName={setUserName}
                                setUserId={setUserId}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <SignUpPage
                                setName={setName}
                                setUserName={setUserName}
                                setUserId={setUserId}
                            />
                        }
                    />
                    {isAuthenticated && (
                        <>
                            <Route
                                path="/dashboard"
                                element={
                                    <MainDashboard
                                        onOpen={onOpen}
                                        isOpen={isOpen}
                                        onOpenChange={onOpenChange}
                                        error={error}
                                        fetchIdeas={fetchIdeas}
                                        ideas={ideas}
                                        setIdeas={setIdeas}
                                        userId={userId}
                                        setError={setError}
                                        loadingIdeas={loadingIdeas}
                                    />
                                }
                            />
                            <Route path="/aichat" element={<AIChat />} />
                            <Route
                                path="/settings"
                                element={
                                    <SettingsMenu
                                        handleSignOut={handleSignOut}
                                    />
                                }
                            />
                        </>
                    )}
                </Routes>
            </div>
            {/* Menubar for small screens */}
            {isAuthenticated && !shouldHideSideMenu && (
                <MobileMenuBar onOpen={onOpen} />
            )}
        </div>
    );
}

export default App;
