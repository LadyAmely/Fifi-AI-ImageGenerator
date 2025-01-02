import React, {useState} from 'react'
import "../styles/sidebar.css"

function Sidebar(){
   const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeChat, setActiveChat] = useState(null);


  const chatHistory = [
  { id: 1, message: "Design a modern homepage for a tech startup" },
  { id: 2, message: "Create a user interface for a fitness tracking app" },
  { id: 3, message: "Generate a mobile app interface for online shopping" },
  { id: 4, message: "Visualize a dashboard layout for a project management tool" },
  { id: 5, message: "Create a wireframe for a travel booking website" }
];


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleChatClick = (id) => {
    setActiveChat(id);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">Chat History</div>
      <div className="chat-history">
        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`chat-history-item ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => handleChatClick(chat.id)}
          >
            {chat.message}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">

      </div>
    </div>
  );
}

export default Sidebar;