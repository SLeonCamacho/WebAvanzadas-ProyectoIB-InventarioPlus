"use client";

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';
import Chat from '../chat/chat';
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

const handleLogout = () => {
  // Eliminar la cookie del correo electrónico del usuario
  document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  // Redirigir a la página de inicio de sesión
  window.location.href = '/login';
};
const Dashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState('');
  const [userID, setUserID] = useState('');
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [inventoryDetailsData, setInventoryDetailsData] = useState<InventoryDetails[]>([]);
  const [ordersData, setOrdersData] = useState<Orders[]>([]);
  const [orderItemsData, setOrderItemsData] = useState<OrderItems[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [averageQuantity, setAverageQuantity] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);

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

        const totalProducts = data.length;
        const totalQuantity = data.reduce((acc, item) => acc + (item.quantity || 0), 0);
        const totalPrice = data.reduce((acc, item) => acc + (parseFloat(item.price as unknown as string) || 0), 0);

        setTotalProducts(totalProducts);
        setAverageQuantity(totalProducts > 0 ? totalQuantity / totalProducts : 0);
        setAveragePrice(totalProducts > 0 ? totalPrice / totalProducts : 0);
      };

      loadInventoryData();

      {/*
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
      
      loadInventoryDetailsData();
      loadOrdersData();
      loadOrderItemsData();
      
      */}

    }
  }, [userID]);

  const totalProductsSpring = useSpring({ from: { number: 0 }, number: totalProducts, delay: 1000 });
  const averageQuantitySpring = useSpring({ from: { number: 0 }, number: averageQuantity, delay: 1000 });
  const averagePriceSpring = useSpring({ from: { number: 0 }, number: averagePrice, delay: 1000 });

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
        <button
  onClick={handleLogout}
  className="px-4 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700"
>
  Logout
</button>
        <div className="flex items-center justify-center">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/person-hand-wave.jpg"
            alt="Persona saludando"
            width={180}
            height={40}
            priority
          />
        </div>
        <p className="text-lg text-gray-700 mb-4">Here you can see data, perform CRUD operations and chat with other users.</p>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="px-4 py-2 bg-blue-100 rounded-full">
            <p className="text-black">Total Products: <animated.span>{totalProductsSpring.number.to(n => n.toFixed(0))}</animated.span></p>
          </div>
          <div className="px-4 py-2 bg-green-100 rounded-full">
            <p className="text-black">Average Quantity: <animated.span>{averageQuantitySpring.number.to(n => n.toFixed(2))}</animated.span></p>
          </div>
          <div className="px-4 py-2 bg-yellow-100 rounded-full">
            <p className="text-black">Average Price: <animated.span>{averagePriceSpring.number.to(n => n.toFixed(2))}</animated.span></p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 text-black">
          <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Inventory</h2>
            <InventoryTable data={inventoryData} />
            <TabsInventory userID={userID} setInventoryData={setInventoryData} />
          </div>
          {/*
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
          */}
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
      {showChat && <Chat onClose={closeChat} userName={userName} />}
    </section>
  );
};

export default Dashboard;
