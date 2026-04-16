import React, { createContext, useState, useContext, useEffect } from 'react';
import { DATA_SOURCE_TYPE } from '../constants'; // Import the constant

const DataSourceContext = createContext();

export const DataSourceProvider = ({ children }) => {
  const dataSource = DATA_SOURCE_TYPE; // Reading directly from constants

  const [partners, setPartners] = useState(() => {
    const saved = localStorage.getItem('memory_partners');
    return saved ? JSON.parse(saved) : [];
  });



  useEffect(() => {
    if (partners.length > 0) {
      localStorage.setItem('memory_partners', JSON.stringify(partners));
    }
  }, [partners]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('activeUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const loginUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('activeUser', JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('activeUser');
  };

  return (
    <DataSourceContext.Provider value={{ 
      dataSource, 
      partners, setPartners, 
      currentUser, loginUser, logoutUser 
    }}>
      {children}
    </DataSourceContext.Provider>
  );
};

export const useDataSource = () => useContext(DataSourceContext);