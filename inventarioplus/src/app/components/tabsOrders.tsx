import React, { useState } from 'react';

const TabsOrders = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex border-b">
        {['Create', 'Read', 'Update', 'Delete'].map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 focus:outline-none ${index === activeTab ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-4">
        {activeTab === 0 && (
          <div>
            <h2>Create</h2>
            <form>
              <input type="number" placeholder="User ID" required className="mb-2 p-2 border rounded" />
              <input type="datetime-local" placeholder="Order Date" required className="mb-2 p-2 border rounded" />
              <input type="number" step="0.01" placeholder="Total" required className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
            </form>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <h2>Read</h2>
            <form>
              <input type="date" placeholder="Search by Order Date" className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
            </form>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2>Update</h2>
            <form>
              <input type="number" placeholder="Order ID" required className="mb-2 p-2 border rounded" />
              <input type="number" placeholder="New User ID" className="mb-2 p-2 border rounded" />
              <input type="datetime-local" placeholder="New Order Date" className="mb-2 p-2 border rounded" />
              <input type="number" step="0.01" placeholder="New Total" className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
            </form>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2>Delete</h2>
            <form>
              <input type="number" placeholder="Order ID" required className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsOrders;
