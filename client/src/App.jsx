import { Routes, Route } from "react-router-dom";
import MainDashboard from "./pages/dashboard/MainDashboard";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import SettingsMenu from "./components/sidemenu/SettingsMenu";
import NavBar from "./components/navBar/NavBar";
import SideMenu from "./components/sidemenu/SideMenu";
import AIChat from "./components/aiChat/AIChat";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import MobileMenuBar from "./components/sidemenu/MobileMenuBar";

function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ideas, setIdeas] = useState([]);
    const [inProgressIdeas, setInProgressIdeas] = useState(null);
    const [displayAllIdeas, setDisplayAllIdeas] = useState(true);
    const [displayAll, setDisplayAll] = useState(true);
    const [filteredIdeas, setFilteredIdeas] = useState([]);
    const [showAiChat, setShowAiChat] = useState(false);
    // Display on "In Porgress" Ideas
    const showInProgressIdeas = () => {
        const filteredIdeas = ideas.filter(
            (idea) => idea.category === "In Progress"
        );
        setInProgressIdeas(filteredIdeas);
    };

    const filterIdeas = (query) => {
        const filtered = ideas.filter((idea) =>
            idea.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredIdeas(filtered);
    };

    const handleDisplayAllIdeas = () => {
        setDisplayAll(true);
        setDisplayAllIdeas(true);
    };

    const handleDisplayInProgressIdeas = () => {
        setDisplayAll(false);
        setDisplayAllIdeas(false);
        showInProgressIdeas();
    };

    // // Toggle AI Chat
    // const toggleAiChat = () => {
    //     setShowAiChat((prevState) => !prevState);
    // };
    return (
        <div className="flex w-full flex-col">
            <NavBar />
            <div className="flex w-full min-h-screen">
                <SideMenu
                    onOpen={onOpen}
                    handleDisplayAllIdeas={handleDisplayAllIdeas}
                    handleDisplayInProgressIdeas={handleDisplayInProgressIdeas}
                    // toggleAiChat={toggleAiChat}
                />

                {/* {showAiChat && <AIChat />} */}

                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <MainDashboard
                                isOpen={isOpen}
                                onOpen={onOpen}
                                onOpenChange={onOpenChange}
                                filterIdeas={filterIdeas}
                                ideas={ideas}
                                setIdeas={setIdeas}
                                handleDisplayAllIdeas={handleDisplayAllIdeas}
                                handleDisplayInProgressIdeas={
                                    handleDisplayInProgressIdeas
                                }
                                // toggleAiChat={toggleAiChat}
                                inProgressIdeas={inProgressIdeas}
                                displayAllIdeas={displayAllIdeas}
                                displayAll={displayAll}
                                filteredIdeas={filteredIdeas}
                            />
                        }
                    />

                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/settings" element={<SettingsMenu />} />
                    <Route path="/aichat" element={<AIChat />} />
                </Routes>
            </div>
            {/* Small Screens */}
            <MobileMenuBar
                onOpen={onOpen}
                handleDisplayAllIdeas={handleDisplayAllIdeas}
                handleDisplayInProgressIdeas={handleDisplayInProgressIdeas}
                // toggleAiChat={toggleAiChat}
            />
        </div>
    );
}

export default App;
