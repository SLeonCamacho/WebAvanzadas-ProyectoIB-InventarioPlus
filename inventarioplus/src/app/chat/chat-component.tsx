import React from 'react';

interface ChatProps {
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 w-150 p-4 bg-white rounded-t-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Chat messages will appear here.</p>
        <button onClick={onClose} className="text-red-500 hover:text-red-700">X</button>
      </div>
      <div className="h-60 overflow-y-scroll border-b-2 border-gray-200 p-2 mb-4">
        {/* Here you will loop over and display chat messages */}
      </div>
      <form className="flex space-x-2">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
