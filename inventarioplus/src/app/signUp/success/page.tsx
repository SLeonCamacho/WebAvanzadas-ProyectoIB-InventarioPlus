import Link from 'next/link';
import React from 'react';

const Success = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-black">All set up!</h1>
        <Link className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" href="/dashboard">
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default Success;
