import { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import Message from "../modules/message.js";
import SendButton from "../modules/sendButton.js";
import key from "../help/OPENAI_API_KEY";
import "../stylesheets/chat.css";

const model = "o1-mini";

export default function Chat() {
    const openai = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true,
    });
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [pendingStatus, setPendingStatus] = useState("normal");
    const inputArea = useRef(null);

    const keyDownHandler = (event) => {
        if (
            document.activeElement === inputArea.current &&
            event.code === "Enter"
        ) {
            event.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    });

    const sendMessage = async () => {
        if (inputValue.trim()) {
            setInputValue("");
            setPendingStatus("pending");

            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "user", content: inputValue },
            ]);

            const completion = await openai.chat.completions.create({
                model: model,
                messages: [
                    {
                        role: "user",
                        content: inputValue,
                    },
                ],
            });

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender: "gpt",
                    content: completion.choices[0].message.content,
                },
            ]);

            setPendingStatus("normal");
        }
    };

    return (
        <div className="wrapper">
            <div className="ChatWindow">
                <div className="Messages">
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            text={message.content}
                            sender={message.sender}
                        />
                    ))}
                </div>
                <div className="Chat">
                    <textarea
                        ref={inputArea}
                        id="chatInputField"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Your message..."
                    />
                    <SendButton
                        pendingStatus={pendingStatus}
                        sendMessage={sendMessage}
                    />
                </div>
            </div>
        </div>
    );
}
