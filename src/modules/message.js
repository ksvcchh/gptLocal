import "../stylesheets/message.css";
import ReactMarkdown from "react-markdown";

export default function Message({ text, sender }) {
    return sender === "user" ? (
        <div className="MessageUser">{text}</div>
    ) : (
        <div className="MessageGpt">{<ReactMarkdown children={text} />}</div>
    );
}
