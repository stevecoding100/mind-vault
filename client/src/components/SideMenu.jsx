import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { GrInProgress } from "react-icons/gr";
import { BsLightbulb } from "react-icons/bs";
import { BsChevronCompactDown } from "react-icons/bs";
import { BsChevronCompactUp } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { CgSupport } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";
import CreatingIdeaModal from "./CreatingIdeaModal";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const SideMenu = ({
    onOpen,
    toggleSearchInput,
    showInProgressIdeas,
    setDisplayAllIdeas,
    name,
    userName,
}) => {
    const [displayAll, setDisplayAll] = useState(true);

    const navigate = useNavigate();
    const handleSignOut = () => {
        // Clear user authentication data from local storage
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("userName");

        // Redirect to the sign-in page or any other desired route
        navigate("/login");
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

    return (
        <div className="min-h-screen w-[250px] bg-slate-100 flex flex-col  p-4 pt-4 border-r-2 border-slate-300 shadow-md">
            <div className="flex  w-full h-30 border-b-2 border-slate-300 pb-4">
                <Link to="#">
                    <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                        alt="profile avatar"
                        className="w-10 h-10 rounded-full border-1 border-white"
                    />
                </Link>
                <div className=" ml-4">
                    <p className="text-slate-900 font-bold text-lg">{name}</p>
                    <p className="text-slate-700 text-sm">{userName}</p>
                </div>
            </div>
            <div className="pt-4 flex flex-col border-b-2 border-slate-300 h-80">
                <button
                    onClick={onOpen}
                    className="w-full  h-12 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition duration-150 ease-in-out font-bold"
                >
                    + New Idea
                </button>
                <div className="pt-6">
                    <button
                        onClick={handleDisplayAllIdeas}
                        className="flex tracking-wide items-center text-md font-semibold  p-2 w-full h-12 hover:bg-blue-300 rounded-lg transition duration-150 ease-in-out text-slate-700 hover:text-blue-700"
                    >
                        <BiHome
                            className="mr-3 group-hover text-slate-400"
                            fontSize={18}
                        />
                        Home
                    </button>
                    <button
                        onClick={toggleSearchInput} // Toggle search input visibility
                        className="flex tracking-wide items-center text-md font-semibold  p-2 w-full h-12 hover:bg-blue-300 rounded-lg transition duration-150 ease-in-out text-slate-700 hover:text-blue-700"
                    >
                        <AiOutlineSearch
                            className="mr-3 group-hover text-slate-400"
                            fontSize={18}
                        />
                        Search
                    </button>
                    <button
                        onClick={handleDisplayInProgressIdeas}
                        className="flex tracking-wide items-center text-md font-semibold  p-2 w-full h-12 hover:bg-blue-300 rounded-lg transition duration-150 ease-in-out text-slate-700 hover:text-blue-700"
                    >
                        <GrInProgress
                            className="mr-3 group-hover text-slate-400"
                            fontSize={18}
                        />
                        In Progress
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center p-2">
                <div className="flex items-center w-full">
                    <BsLightbulb
                        className="mr-2 text-slate-400"
                        fontSize={16}
                    />{" "}
                    <h2 className="text-md font-semibold text-slate-700">
                        Ideas
                    </h2>
                    <BsChevronCompactUp
                        className="ml-24 cursor-pointer"
                        fontSize={18}
                    />
                </div>
                {/* <div className="pt-6 flex text-sm flex-col w-full p-2 text-slate-800 h-[50vh] overflow-y-scroll">
                    {ideas.map((item) => (
                        <div
                            key={item.key}
                            className="mb-4 py-3 px-3 w-full bg-blue-100 shadow-sm text-slate-700 rounded-md font-semibold"
                        >
                            <Link className="">{item.title}</Link>
                        </div>
                    ))}
                </div> */}
            </div>
            <div className="flex flex-col mt-16 p-2">
                <Link className="flex items-center mb-2 font-medium text-slate-500 text-md">
                    <CgSupport className="mr-2" /> Support
                </Link>
                <Link className="flex items-center mb-2 font-medium text-slate-500 text-md">
                    <GrCircleInformation className="mr-2" /> About
                </Link>
                <Link className="flex items-center mb-2 font-medium text-slate-500 text-md">
                    <BsBook className="mr-2" /> Privacy Policy
                </Link>
                <button
                    onClick={handleSignOut}
                    className="py-3 px-4 mt-4 bg-blue-200 rounded-md tracking-wide font-bold text-slate-600 hover:bg-red-500 hover:text-slate-100 "
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default SideMenu;
