import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import Activity from "../../components/Activity";
import ideaAPI from "../../../utils/ideaAPI";
import { useState, useEffect } from "react";
import CreatingIdeaModal from "../../components/CreatingIdeaModal";

const MainDashboard = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const userIdeas = await ideaAPI.idea.getAllIdeas();
                setIdeas(userIdeas.data);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchIdea();
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // Display an error message
    }

    return (
        <div className="flex bg-blue-100">
            <SideMenu />
            <div className="flex flex-col w-full">
                <CreatingIdeaModal />
                <Header ideaData={ideas} />
            </div>
            <div className="w-[430px]">
                <Activity ideaData={ideas} />
            </div>
        </div>
    );
};

export default MainDashboard;
