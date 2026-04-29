// src/dataRepository/index.js

import localStorageProvider from './localStorage/localStorageProvider';
import inMemoryProvider from './memory/inMemoryProvider';
// import firebaseProvider from './firebase/firebaseProvider'; 
// import customMapProvider from './customMap/customMapProvider';

import { DATA_SOURCE } from '../constants';

const getDataProvider = () => {
    switch (DATA_SOURCE) {
        case 'localStorage':
            return localStorageProvider;
        case 'memory':
            return inMemoryProvider;
        default:
            return localStorageProvider; // Default to localStorage
    }
};

export const dataProvider = getDataProvider();