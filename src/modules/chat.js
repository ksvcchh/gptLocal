import { useState } from "react";
import OpenAI from "openai";
import "../stylesheets/chat.css";
import Message from "../modules/message.js";
import key from "../help/OPENAI_API_KEY";

export default function Chat() {
    const openai = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true,
    });
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const sendMessage = async () => {
        if (inputValue.trim()) {
            setMessages((prevMessages) => [...prevMessages, inputValue]);
            setInputValue("");
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user",
                        content: inputValue,
                    },
                ],
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                completion.choices[0].message.content,
            ]);
        }
    };

    return (
        <div className="wrapper">
            <div className="ChatWindow">
                <div className="Messages">
                    {messages.map((message, index) => (
                        <Message key={index} text={message} />
                    ))}
                </div>
                <div className="Chat">
                    <textarea
                        id="chatInputField"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Your message..."
                    />
                    <button id="sendButton" onClick={sendMessage}>
                        Send!
                    </button>
                </div>
            </div>
        </div>
    );
}
