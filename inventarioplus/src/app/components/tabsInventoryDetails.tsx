import React, { useState } from 'react';

const TabsInventoryDetails = () => {
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
              <input type="number" placeholder="Inventory ID" required className="mb-2 p-2 border rounded" />
              <input type="text" placeholder="Description" required className="mb-2 p-2 border rounded" />
              <input type="text" placeholder="Manufacturer" required className="mb-2 p-2 border rounded" />
              <input type="date" placeholder="Expiry Date" required className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
            </form>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <h2>Read</h2>
            <form>
              <input type="text" placeholder="Search by Description" className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
            </form>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2>Update</h2>
            <form>
              <input type="number" placeholder="Inventory Details ID" required className="mb-2 p-2 border rounded" />
              <input type="number" placeholder="New Inventory ID" className="mb-2 p-2 border rounded" />
              <input type="text" placeholder="New Description" className="mb-2 p-2 border rounded" />
              <input type="text" placeholder="New Manufacturer" className="mb-2 p-2 border rounded" />
              <input type="date" placeholder="New Expiry Date" className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
            </form>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2>Delete</h2>
            <form>
              <input type="number" placeholder="Inventory Details ID" required className="mb-2 p-2 border rounded" />
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsInventoryDetails;
