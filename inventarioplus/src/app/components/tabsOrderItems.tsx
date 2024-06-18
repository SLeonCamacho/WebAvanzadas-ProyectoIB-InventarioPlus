import React, { useState } from 'react';

const TabsOrderItems = () => {
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
              <input type="number" placeholder="Order ID" required className="mb-2 p-2 border rounded" />
              <input type="number" placeholder="Product ID" required className="mb-2 p-2 border rounded" />
              <input type="number" placeholder="Quantity" required className="mb-2 p-2 border rounded" />
              <input type="number" step="0.01" placeholder="Price" required className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
            </form>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <h2>Read</h2>
            <form>
              <input type="number" placeholder="Search by Quantity" className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
            </form>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2>Update</h2>
            <form>
              <input type="number" placeholder="Order Item ID" required className="mb-2 p-2 border rounded" />
              <input type="number" placeholder="New Order ID" className="mb-2 p-2 border rounded" />
              <input type="number" placeholder="New Product ID" className="mb-2 p-2 border rounded" />
              <input type="number" placeholder="New Quantity" className="mb-2 p-2 border rounded" />
              <input type="number" step="0.01" placeholder="New Price" className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
            </form>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2>Delete</h2>
            <form>
              <input type="number" placeholder="Order Item ID" required className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsOrderItems;
