// src/dataRepository/index.js

import localStorageProvider from './localStorage/localStorageProvider';
import inMemoryProvider from './memory/inMemoryProvider';
import firebaseProvider from './firebase/firebaseProvider';
import { DATA_SOURCE } from '../constants';

const getDataProvider = () => {
    switch (DATA_SOURCE) {
        case 'localStorage':
            return localStorageProvider;
        case 'memory':
            return inMemoryProvider;
            case 'firebase':
                return firebaseProvider;
        default:
            return localStorageProvider; // Default to ""
    }
};

export const dataProvider = getDataProvider();