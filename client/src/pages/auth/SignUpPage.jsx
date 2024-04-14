import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAPI from "../../../utils/authAPI";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await authAPI.auth.register({
                name,
                username,
                email,
                password,
            });
            if (result.status === 201) {
                console.log("User registered", result);
                navigate("/");
            } else {
                throw new Error(result.response.data.error);
            }
        } catch (err) {
            if (err.message.includes("users_email_key")) {
                setError("Email already in use. Please try again.");
            } else if (err.message.includes("users_username_key")) {
                setError("Username already in use. Please try again.");
            } else {
                setError("An error occurred. Please try again.");
            }
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
                                Sign Up
                            </h1>
                            <form
                                className="w-full flex flex-col py-4 font-sans"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className="p-3 my-2 bg-gray-100 rounded"
                                    type="name"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
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
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    Sign Up
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
                                        Already a user to MindVault?
                                    </span>
                                    <Link to="/login"> Sign In</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
