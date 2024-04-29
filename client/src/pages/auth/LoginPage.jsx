import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAPI from "../../../utils/authAPI";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await authAPI.auth.login({ username, password });

        console.log("User Info: ", result);

        if (result.status === 200) {
            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };
    return (
        <>
            <div className="w-full h-screen">
                <img
                    className="sm:block absolute w-full h-full object-cover"
                    src={
                        "https://static.vecteezy.com/system/resources/thumbnails/022/719/920/small/virtual-brain-with-splash-paint-isolated-on-white-banner-brainstorm-concept-place-for-text-generative-ai-photo.jpg"
                    }
                    alt="popular anime show"
                />
                <div className="fixed top-0 left-0 w-full h-screen"></div>
                <div className="fixed w-full px-4 py-16 z-50">
                    <div className="max-w-[450px] h-[650px] mx-auto bg-gray-300 text-gray-800 rounded-md">
                        <div className="max-w-[320px] mx-auto py-16">
                            <h1 className="text-3xl font-bold font-sans">
                                Sign In
                            </h1>
                            <form
                                className="w-full flex flex-col py-4 font-sans"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className="p-3 my-2 bg-gray-100 rounded"
                                    type="username"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                                <input
                                    className="p-3 my-2 bg-gray-100 rounded"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                {error && (
                                    <p className="text-red-500 font-sans text-sm">
                                        {error}
                                    </p>
                                )}
                                <button
                                    className="bg-blue-700 py-3 my-6 text-white rounded font-bold"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                                <div className="flex justify-between items-center text-sm text-gray-600 font-sans">
                                    <p>
                                        <input
                                            className="mr-2"
                                            type="checkbox"
                                        />
                                        Remember me
                                    </p>
                                    <p>Need Help?</p>
                                </div>
                                <p className="py-8 font-sans">
                                    <span className="text-gray-600">
                                        New to MindVault?
                                    </span>
                                    <Link to="/signup"> Sign Up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
