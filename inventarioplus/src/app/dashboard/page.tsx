"use client";

import React, { useState, useEffect } from 'react';
import Chat from '../chat/chat-component';
import { getCookie } from 'cookies-next';
import { getUserNameByEmail } from '../api/fetch-data/async-queries-user';

const Dashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const email = getCookie('userEmail');
      if (email) {
        const user = await getUserNameByEmail(email.toString());
        if (user.length > 0) {
          setUserName(user[0].name);
        } else {
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    };

    fetchUserName();
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Dashboard</h1>
        <p className="text-lg text-gray-700 mb-4">Welcome, {userName}</p>
        <p className="text-lg text-gray-700 mb-4">A dashboard to display data and perform CRUD operations.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Data Section 1</h2>
            <p>Details about this section.</p>
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Data Section 2</h2>
            <p>Details about this section.</p>
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Data Section 3</h2>
            <p>Details about this section.</p>
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Data Section 4</h2>
            <p>Details about this section.</p>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <button 
            onClick={toggleChat} 
            className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700"
          >
            Chat
          </button>
        </div>
      </div>
      {showChat && <Chat onClose={closeChat} />}
    </section>
  );
};

export default Dashboard;
