export default function SendButton({ pendingStatus, sendMessage }) {
    if (pendingStatus === "pending") {
        return <button id="sendButton">...</button>;
    }
    return (
        <button id="sendButton" onClick={sendMessage}>
            Send!
        </button>
    );
}
