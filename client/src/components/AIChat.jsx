import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const openAiKey = import.meta.env.OPENAI_API_KEY;

const AIChat = () => {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        { message: "Hello, I am chatGPT!", sender: "chatGPT" },
    ]);

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing",
        };

        const newMessages = [...messages, newMessage]; // all the old messages, + the new message
        // Update our message state
        setMessages(newMessages);

        // set a typing indicator (chatgpt is typing)
        setTyping(true);

        // process message to chatGPT (send it over and see the response)
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";

            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message };
        });
        // role: 'user' -> a message from the user, 'assistant' -> a response from chatGPT
        // 'system' -> generally one initial message defining How we want chatGPT to talk

        const systemMessage = {
            role: "system",
            content: "Explain to me like you are giving me great ideas", // Speak like a pirate, Explain like I have  10 years of experience software engineer
        };

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [systemMessage, ...apiMessages], // [message1, message2]
        };

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${openAiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
                // setMessages([
                //     ...chatMessages,
                //     {
                //         message: data.choices[0].message.content,
                //         sender: "ChatGPT",
                //     },
                // ]);
                // setTyping(false);
            });
    }

    return (
        <div>
            <div className="absolute  left-[190px] hidden md:block h-full w-[50%]">
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={
                                typing ? (
                                    <TypingIndicator content="chatGPT is typing" />
                                ) : null
                            }
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />;
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
