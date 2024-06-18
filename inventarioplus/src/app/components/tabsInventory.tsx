import React, { useState } from 'react';
import { createInventory } from '../api/insert-data/async-queries';
import { fetchInventoryByProductName, fetchAllInventory } from '../api/fetch-data/async-queries';
import { updateInventory } from '../api/update-data/async-queries';
import { deleteInventory } from '../api/delete-data/async-queries';
import { Inventory } from '../types/tables';
import InventoryTable from '../components/inventoryTable';

type TabsInventoryProps = {
  userID: string;
  setInventoryData: React.Dispatch<React.SetStateAction<Inventory[]>>;
};

const TabsInventory: React.FC<TabsInventoryProps> = ({ userID, setInventoryData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [productID, setProductID] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [deleteProductID, setDeleteProductID] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState<Inventory[]>([]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userID) {
      try {
        const result = await createInventory(productName, parseInt(quantity), parseFloat(price), parseInt(userID));
        if (result) {
          alert('Inventory item created successfully');
          const updatedData = await fetchAllInventory(parseInt(userID));
          setInventoryData(updatedData);
        } else {
          alert('Failed to create inventory item');
        }
      } catch (error) {
        console.error('Error creating inventory item:', error);
        alert('Error creating inventory item');
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userID) {
      try {
        const results = await fetchInventoryByProductName(searchName, parseInt(userID));
        setSearchResults(results);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        alert('Error fetching inventory');
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateInventory(parseInt(productID), newProductName, parseInt(newQuantity), parseFloat(newPrice));
      if (result) {
        alert('Inventory item updated successfully');
        const updatedData = await fetchAllInventory(parseInt(userID));
        setInventoryData(updatedData);
      } else {
        alert('Failed to update inventory item');
      }
    } catch (error) {
      console.error('Error updating inventory item:', error);
      alert('Error updating inventory item');
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await deleteInventory(parseInt(deleteProductID));
      if (result) {
        alert('Inventory item deleted successfully');
        const updatedData = await fetchAllInventory(parseInt(userID));
        setInventoryData(updatedData);
      } else {
        alert('Failed to delete inventory item');
      }
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      alert('Error deleting inventory item');
    }
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
            <form onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Product Name"
                required
                className="mb-2 p-2 border rounded"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                required
                className="mb-2 p-2 border rounded"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                required
                className="mb-2 p-2 border rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
            </form>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <h2>Read</h2>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search by Product Name"
                className="mb-2 p-2 border rounded"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Search</button>
            </form>
            <div className="mt-4">
              {searchResults.length > 0 ? (
                <InventoryTable data={searchResults} />
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h2>Update</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="number"
                placeholder="Product ID"
                required
                className="mb-2 p-2 border rounded"
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <input
                type="text"
                placeholder="New Product Name"
                className="mb-2 p-2 border rounded"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
              />
              <input
                type="number"
                placeholder="New Quantity"
                className="mb-2 p-2 border rounded"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
              <input
                type="number"
                placeholder="New Price"
                className="mb-2 p-2 border rounded"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
            </form>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <h2>Delete</h2>
            <form onSubmit={handleDelete}>
              <input
                type="number"
                placeholder="Product ID"
                required
                className="mb-2 p-2 border rounded"
                value={deleteProductID}
                onChange={(e) => setDeleteProductID(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsInventory;
