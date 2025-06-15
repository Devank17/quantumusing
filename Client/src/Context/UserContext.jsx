import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContextData = createContext(null); // Ensure a default value

const UserContext = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const fetchUser = async () => {
    try {
      console.log("Fetching user...");
      const token = localStorage.getItem('token');  
      
      if (!token) {
        console.log("❌ No token found in localStorage");
        return;
      }

      const response = await axios.get('http://localhost:4000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log("✅ User data received:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("❌ Error fetching user:", error);

      if (error.response?.status === 401) {
        console.log("⚠️ Unauthorized, clearing token...");
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContextData.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContextData.Provider>
  );
};

export default React.memo(UserContext); // ✅ Ensures stable export for HMR