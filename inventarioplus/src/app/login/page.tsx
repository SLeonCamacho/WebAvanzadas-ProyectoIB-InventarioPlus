"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserByEmailAndPassword } from '../api/fetch-data/users/query-users';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fetch the user from the database
    const users = await getUserByEmailAndPassword(email, password);

    // Check if the user exists
    if (users.length > 0) {
      setMessage('');
      router.push('/dashboard');
    } else {
      setMessage('User not registered or incorrect password.');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {message && <p className="text-red-500">{message}</p>}
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
      <div className="text-center">
        <ul className="space-y-4">
          <li>
            <Link className="text-blue-500 hover:underline" href="/forgotPass">
              Forgot Password?
            </Link>
          </li>
          <li>
            <Link className="text-blue-500 hover:underline" href="/signUp">
              Not registered yet?
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Login;
