import React, { useState, useEffect, useRef } from 'react';

interface ChatProps {
  onClose: () => void;
  userName: string;
}

const Chat: React.FC<ChatProps> = ({ onClose, userName }) => {
  const [messages, setMessages] = useState<{ user: string, text: string }[]>([]);
  const [message, setMessage] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onmessage = (event) => {
      try {
        const receivedMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleSend = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const newMessage = { user: userName, text: message };
      ws.current.send(JSON.stringify(newMessage));
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-0 right-0 w-150 p-4 bg-white rounded-t-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onClose} className="text-gray-700 hover:text-red-700">X</button>
      </div>
      <div className="h-60 overflow-y-scroll border-b-2 border-gray-200 p-2 mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="text-black"><strong>{msg.user}:</strong> {msg.text}</p>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
