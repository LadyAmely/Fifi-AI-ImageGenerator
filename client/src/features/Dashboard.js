import React, {useState} from 'react'
import "../styles/dashboard.css"


function Dashboard(){

    const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "bot", text: "This is a placeholder response." },
      ]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };


    return (
        <div className="chat-container">
            <div className="chat-header">Fifi AI</div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="send-button" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default Dashboard;