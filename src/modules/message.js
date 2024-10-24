import "../stylesheets/message.css";

export default function Message({ text, sender }) {
    return sender === "user" ? (
        <div className="MessageUser">{text}</div>
    ) : (
        <div className="MessageGpt">{text}</div>
    );
}
