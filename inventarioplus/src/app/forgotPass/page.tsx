"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { getUserByEmail } from '../api/fetch-data/async-queries-user';
import { useRouter } from 'next/navigation';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailUser = await getUserByEmail(email);
    
    if (emailUser.length > 0) {
      router.push(`/renewPass?email=${encodeURIComponent(email)}`);
    } else {
      setMessage('User not found.');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Send
          </button>
          {message && <p className="text-red-500">{message}</p>}
        </form>
      </div>
      <div className="text-center">
        <ul className="space-y-4">
          <li>
            <Link className="text-blue-500 hover:underline" href="/login">
              Back to Login
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ForgotPass;
