import React, { createContext, useContext, useState } from 'react';
import { DATA_SOURCE } from '../Constants';

const DataSourceContext = createContext();

export const DataSourceProvider = ({ children }) => {
const [partners, setPartners] = useState([]);

  return (
    <DataSourceContext.Provider value={{ dataSource: DATA_SOURCE, partners, setPartners }}>
      {children}
    </DataSourceContext.Provider>
  );
};

export const useDataSource = () => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error("useDataSource must be used within a DataSourceProvider");
  }
  return context;
};