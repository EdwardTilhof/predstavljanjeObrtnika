// src/dataRepository/index.js

import localStorageProvider from './localStorage/localStorageProvider';
import inMemoryProvider from './memory/inMemoryProvider';
// import firebaseProvider from './firebase/firebaseProvider'; // Future
// import customMapProvider from './customMap/customMapProvider'; // Future

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