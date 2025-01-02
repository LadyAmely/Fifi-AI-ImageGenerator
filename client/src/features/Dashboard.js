import React, { useState } from 'react';
import "../styles/dashboard.css"
import Sidebar from "../components/Sidebar";

function Dashboard(){

    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi! I'm Fifi. Give me a description and I'll create an image based on it! 😊" },
    ]);
    const [input, setInput] = useState("");

    const fetchBotResponse = async (userInput) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: userInput }),
            });

            const data = await response.json();

            if (data.image_base64) {
                return `data:image/png;base64,${data.image_base64}`;
            } else {
                return "Sorry, I couldn't generate an image.";
            }
        } catch (error) {
            console.error("Error fetching bot response:", error);
            return "There was an error connecting to the AI.";
        }
    };

    const handleSendMessage = async () => {
        if (input.trim()) {
            setMessages((prev) => [...prev, { sender: "user", text: input }]);
            const botResponse = await fetchBotResponse(input);
            setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
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
                        {msg.text.startsWith("data:image/png;base64,") ? (
                            <img src={msg.text} alt="Generated AI Image" style={{maxWidth: "100%"}} />
                        ) : (
                            msg.text
                        )}
                    </div>
                ))}
                 <Sidebar/>
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
    );
}

export default Dashboard;
