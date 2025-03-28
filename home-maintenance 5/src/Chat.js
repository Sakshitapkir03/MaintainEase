import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to messages
    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);

    try {
      // Send message to FastAPI backend
      const response = await axios.post("http://127.0.0.1:8000/chat/", {
        user_message: input,
        context: messages.map((msg) => ({
          user: msg.role === "user" ? msg.content : null,
          assistant: msg.role === "assistant" ? msg.content : null,
        })),
      });

      const assistantReply = response.data.assistant_reply || "Sorry, I encountered an issue.";

      // Add assistant reply to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: assistantReply },
      ]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
    }

    // Clear input
    setInput("");
  };

  // Handle "Enter" key press for input submission
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 HomeFix Buddy</h1>
      <div style={{ border: "1px solid #ddd", padding: "10px", height: "400px", overflowY: "auto", background:"#fff", borderRadius:"20px"}}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <strong>{msg.role === "user" ? "You" : "HomeFix Buddy"}:</strong>
            <div>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <input
        style={{ width: "80vw", padding: "10px", marginTop: "10px", borderRadius:"10px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <button style={{ padding: "10px", borderRadius:"10px" }} onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default Chat;
