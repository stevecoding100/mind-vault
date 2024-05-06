import { useState } from "react";
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

const AIChat = () => {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message:
                "Hello, I am your AI assistant! What idea you have in mind?",
            sender: "MindVault",
            direction: "incoming", // Set direction for initial AI message
            isMyMessage: false, // Set isMyMessage for initial AI message
        },
    ]);

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

    async function processMessageToGeminiAI(chatMessages) {
        try {
            // Extract text from each message object
            const texts = chatMessages.map((message) => message.message);

            // Concatenate text into a single string
            const text = texts.join("\n");

            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAY1Ht8XPaIBGCGsV41Ai2LgtUCtWk4EJ8`,
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
        <div>
            <div className="absolute  md:left-[190px] top-20 block h-full md:w-[50%]">
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={
                                typing ? (
                                    <TypingIndicator content="MindVault is thinking..." />
                                ) : null
                            }
                        >
                            {messages.map((message, i) => {
                                return (
                                    <Message
                                        key={i}
                                        model={message}
                                        isMyMessage={message.isMyMessage} // Pass isMyMessage prop
                                        direction={message.direction} // Pass direction prop
                                    />
                                );
                            })}
                        </MessageList>
                        <MessageInput
                            placeholder="Type message here"
                            onSend={handleSend}
                        />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
};

export default AIChat;
