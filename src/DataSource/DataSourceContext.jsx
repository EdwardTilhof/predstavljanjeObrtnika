import React, { createContext, useState, useContext, useEffect } from 'react';

// Global memory, room is better!

const DataSourceContext = createContext();

export const DataSourceProvider = ({ children }) => {
const [dataSource, setDataSource] = useState(() => {
    return localStorage.getItem('userPreferredSource') || 'localStorage';
  });

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
      currentUser, loginUser, logoutUser 
    }}>
      {children}
    </DataSourceContext.Provider>
  );
};

export const useDataSource = () => useContext(DataSourceContext);