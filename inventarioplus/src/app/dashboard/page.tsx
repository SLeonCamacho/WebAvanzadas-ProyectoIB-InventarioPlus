"use client";

import React, { useState, useEffect } from 'react';
import Chat from '../chat/chat-component';
import { getCookie } from 'cookies-next';
import { getUserNameByEmail, getUserIDByEmail } from '../api/fetch-data/async-queries-user';
import { fetchAllInventory, fetchAllInventoryDetails, fetchAllOrders, fetchAllOrderItems } from '../api/fetch-data/async-queries';
import InventoryTable from '../components/inventoryTable';
import InventoryDetailsTable from '../components/inventoryDetailsTable';
import OrdersTable from '../components/ordersTable';
import OrderItemsTable from '../components/orderItemsTable';
import { Inventory, InventoryDetails, Orders, OrderItems } from '../types/tables';
import TabsInventory from '../components/tabsInventory';
import TabsInventoryDetails from '../components/tabsInventoryDetails';
import TabsOrders from '../components/tabsOrders';
import TabsOrderItems from '../components/tabsOrderItems';

const Dashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [inventoryDetailsData, setInventoryDetailsData] = useState<InventoryDetails[]>([]);
  const [ordersData, setOrdersData] = useState<Orders[]>([]);
  const [orderItemsData, setOrderItemsData] = useState<OrderItems[]>([]);

  useEffect(() => {
    const fetchUserNameAndID = async () => {
      const email = getCookie('userEmail');
      if (email) {
        const user = await getUserNameByEmail(email.toString());
        const idUser = await getUserIDByEmail(email.toString());
        if (user.length > 0 && idUser.length > 0) {
          setUserName(user[0].name);
          setUserID(idUser[0].id.toString());
        } else {
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    };

    fetchUserNameAndID();
  }, []);

  useEffect(() => {
    if (userID !== null) {
      const loadInventoryData = async () => {
        const data = await fetchAllInventory(parseInt(userID));
        setInventoryData(data);
      };

      const loadInventoryDetailsData = async () => {
        const data = await fetchAllInventoryDetails(parseInt(userID));
        setInventoryDetailsData(data);
      };

      const loadOrdersData = async () => {
        const data = await fetchAllOrders(parseInt(userID));
        setOrdersData(data);
      };

      const loadOrderItemsData = async () => {
        const data = await fetchAllOrderItems(parseInt(userID));
        setOrderItemsData(data);
      };

      loadInventoryData();
      loadInventoryDetailsData();
      loadOrdersData();
      loadOrderItemsData();
    }
  }, [userID]);

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
        <div className="grid grid-cols-1 gap-4 text-black">
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Inventory</h2>
            <InventoryTable data={inventoryData} />
            <TabsInventory />
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Inventory Details</h2>
            <InventoryDetailsTable data={inventoryDetailsData} />
            <TabsInventoryDetails />
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <OrdersTable data={ordersData} />
            <TabsOrders />
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            <OrderItemsTable data={orderItemsData} />
            <TabsOrderItems />
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