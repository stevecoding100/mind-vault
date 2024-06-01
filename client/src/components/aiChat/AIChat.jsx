import { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axios from "axios";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import { FaRegCopy } from "react-icons/fa";

const AIChat = () => {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState(() => {
        // Retrieve messages from local storage
        const savedMessages = localStorage.getItem("chatMessages");
        return savedMessages
            ? JSON.parse(savedMessages)
            : [
                  {
                      message:
                          "Hello, I am your AI assistant! What idea you have in mind?",
                      sender: "MindVault",
                      direction: "incoming",
                      isMyMessage: false,
                  },
              ];
    });
    useEffect(() => {
        // Save messages to local storage whenever they are updated
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);
    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing", // Set direction for outgoing user message
            isMyMessage: true, // Set isMyMessage for outgoing user message
        };

        const newMessages = [...messages, newMessage]; // all the old messages, + the new message
        // Update our message state
        setMessages(newMessages);

        // set a typing indicator (chatgpt is typing)
        setTyping(true);

        // process message to chatGPT (send it over and see the response)
        await processMessageToGeminiAI(newMessages);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(
            () => {
                console.log("Copied to clipboard");
            },
            (err) => {
                console.error("Failed to copy: ", err);
            }
        );
    };

    async function processMessageToGeminiAI(chatMessages) {
        try {
            // Extract text from each message object
            const texts = chatMessages.map((message) => message.message);

            // Concatenate text into a single string
            const text = texts.join("\n");

            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
                    import.meta.env.VITE_GOOGLE_API_KEY
                }`,
                method: "POST",
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: text,
                                },
                            ],
                        },
                    ],
                },
            });

            const GeminiAnswer =
                response["data"]["candidates"][0]["content"]["parts"][0][
                    "text"
                ]; // Access response text

            // Determine sender based on the last message sender
            const sender =
                chatMessages[chatMessages.length - 1].sender === "user"
                    ? "Gemini"
                    : "user";

            // Update messages with ChatGPT response
            const newMessages = [
                ...chatMessages,
                {
                    message: GeminiAnswer,
                    sender: sender,
                    direction:
                        chatMessages[chatMessages.length - 1].sender === "user"
                            ? "incoming"
                            : "outgoing",
                    isMyMessage:
                        chatMessages[chatMessages.length - 1].sender === "user"
                            ? false
                            : true,
                },
            ];
            setMessages(newMessages);

            // Clear typing indicator
            setTyping(false);
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    }

    return (
        <div className="w-full">
            <h1 className="text-lg md:text-2xl font-bold m-4">AI Chat</h1>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        className="min-h-screen m-2 mt-4"
                        scrollBehavior="smooth"
                        typingIndicator={
                            typing ? (
                                <TypingIndicator content="MindVault is thinking..." />
                            ) : null
                        }
                    >
                        {messages.map((message, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`flex items-center w-full md:w-[70%] ${
                                        message.direction === "outgoing"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <Message
                                        key={i}
                                        model={message}
                                        isMyMessage={message.isMyMessage} // Pass isMyMessage prop
                                        direction={message.direction} // Pass direction prop
                                    />
                                    <FaRegCopy
                                        className="ml-2 cursor-pointer"
                                        title="Copy"
                                        onClick={() =>
                                            copyToClipboard(message.message)
                                        }
                                    />
                                </div>
                            );
                        })}
                    </MessageList>
                    <MessageInput
                        placeholder="Type message here"
                        onSend={handleSend}
                        className="m-3"
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};

export default AIChat;
