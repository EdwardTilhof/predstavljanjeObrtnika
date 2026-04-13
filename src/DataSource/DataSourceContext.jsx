import React, { createContext, useState, useContext, useEffect } from 'react';

const DataSourceContext = createContext();

export const DataSourceProvider = ({ children }) => {
  // 1. Restore the dataSource state (The missing piece!)
  const [dataSource, setDataSource] = useState(() => {
    return localStorage.getItem('userPreferredSource') || 'memory';
  });

  // 2. Partners state with local persistence
  const [partners, setPartners] = useState(() => {
    const saved = localStorage.getItem('memory_partners');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync partners to localStorage whenever they change
  useEffect(() => {
    if (partners.length > 0) {
      localStorage.setItem('memory_partners', JSON.stringify(partners));
    }
  }, [partners]);

  // Sync dataSource preference to localStorage
  useEffect(() => {
    localStorage.setItem('userPreferredSource', dataSource);
  }, [dataSource]);

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
      dataSource, setDataSource, 
      partners, setPartners, 
      currentUser, loginUser, logoutUser 
    }}>
      {children}
    </DataSourceContext.Provider>
  );
};

export const useDataSource = () => useContext(DataSourceContext);