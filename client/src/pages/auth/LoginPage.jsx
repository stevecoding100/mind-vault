import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authAPI from "../../../utils/authAPI";

const LoginPage = ({ setName, setUserName, setUserId }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await authAPI.auth.login({ username, password });

        if (result.status === 200) {
            const token = result.data.token;
            const userId = result.data.user.user_id;
            const name = result.data.user.name;
            const userName = result.data.user.username;

            // Set cookies based on "Remeber me" option

            if (rememberMe) {
                Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
                Cookies.set("userId", userId, { expires: 7 });
                Cookies.set("name", name, { expires: 7 });
                Cookies.set("userName", userName, { expires: 7 });
            } else {
                Cookies.set("token", token);
                Cookies.set("userId", userId);
                Cookies.set("name", name);
                Cookies.set("userName", userName);
            }

            // Trigger state updates directly
            setName(name);
            setUserName(userName);
            setUserId(userId);

            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };
    return (
        <>
            <div className="w-full min-h-screen">
                <img
                    className="sm:block absolute w-full h-full object-cover"
                    src={
                        "https://static.vecteezy.com/system/resources/thumbnails/022/719/920/small/virtual-brain-with-splash-paint-isolated-on-white-banner-brainstorm-concept-place-for-text-generative-ai-photo.jpg"
                    }
                    alt="popular anime show"
                />
                <div className="fixed top-0 left-0 w-full h-screen"></div>
                <div className="fixed w-full px-3 py-12">
                    <div className="max-w-[450px] h-[650px] mx-auto bg-black/85 text-gray-800 rounded-md">
                        <div className="max-w-[320px] mx-auto py-16">
                            <h1 className="text-3xl font-bold font-sans text-white">
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
                                <div className="flex justify-between items-center text-sm text-gray-400 font-sans">
                                    <p>
                                        <input
                                            className="mr-2"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) =>
                                                setRememberMe(e.target.checked)
                                            }
                                        />
                                        Remember me
                                    </p>
                                    <p>Need Help?</p>
                                </div>
                                <p className="py-8 font-sans">
                                    <span className="text-gray-400">
                                        New to MindVault?
                                    </span>
                                    <Link
                                        to="/signup"
                                        className="text-gray-200"
                                    >
                                        {" "}
                                        Sign Up
                                    </Link>
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
