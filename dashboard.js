// pages/admin/dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
    };
    
    const fetchWallets = async () => {
      const response = await axios.get('http://localhost:8080/api/wallet');
      setWallets(response.data);
    };

    fetchUsers();
    fetchWallets();
  }, []);

  const toggleUserActivation = async (userId) => {
    await axios.put(`http://localhost:8080/api/users/${userId}/toggleActivation`);
    setUsers(users.map(user => user._id === userId ? { ...user, isActive: !user.isActive } : user));
  };

  const toggleWalletFreeze = async (walletId) => {
    await axios.put(`http://localhost:8080/api/wallet/freeze/${walletId}`);
    setWallets(wallets.map(wallet => wallet._id === walletId ? { ...wallet, isFrozen: !wallet.isFrozen } : wallet));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.isActive ? 'Active' : 'Inactive'}
            <button onClick={() => toggleUserActivation(user._id)}>Toggle Activation</button>
          </li>
        ))}
      </ul>

      <h2>Wallets</h2>
      <ul>
        {wallets.map(wallet => (
          <li key={wallet._id}>
            Wallet ID: {wallet._id} - {wallet.isFrozen ? 'Frozen' : 'Active'}
            <button onClick={() => toggleWalletFreeze(wallet._id)}>Freeze/Unfreeze</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
