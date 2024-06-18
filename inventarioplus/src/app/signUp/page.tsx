"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserByEmail } from '../api/fetch-data/async-queries-user';
import { createUser } from '../api/insert-data/async-queries';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailUser = await getUserByEmail(email);

    if (emailUser.length > 0) {
      setError('User already registered. Please go back to the login page.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      try {
        const userCreated = await createUser(name, email, password);
        if (userCreated.length > 0) {
          router.push(`/signUp/success?name=${encodeURIComponent(name)}`);
        }
      } catch (error) {
        console.log('Error creating user:', error);
      }
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
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
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
