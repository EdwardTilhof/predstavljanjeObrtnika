import { db } from "./firebaseConfig";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, setDoc } from "firebase/firestore";

const firebaseProvider = {
    getAll: async (key) => {
        try {
            const querySnapshot = await getDocs(collection(db, key));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error(`Error fetching ${key}:`, error);
            return [];
        }
    },
    getById: async (key, id, data) => {
        try {
            const docRef = doc(db, key, id);
            // Change getDocs to getDoc here
            const docSnap = await getDoc(docRef); 
            return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
        } catch (error) {
            console.error(`Error fetching ${key} with ID ${id}:`, error);
            return null;
        }
    },
    add: async (key, newItem) => {
        try {
            const id = newItem.id || Date.now().toString(); 
            const docRef = doc(db, key, String(id));
            await setDoc(docRef, newItem);
            return { id, ...newItem };
        } catch (error) {
            console.error(`Error adding item to Firebase:`, error);
            return null;
        }
    },
    update: async (key, id, data) => {
        try {
            const docRef = doc(db, key, String(id));
            await updateDoc(docRef, data);
            return { id, ...data };
        } catch (error) {
            console.error(`Error updating ${key} with ID ${id}:`, error);
            return null;
        }
    },
    remove: async (key, id) => {
        try {
            const docRef = doc(db, key, String(id));
            await deleteDoc(docRef);
        } catch (error) {
            console.error(`Error removing ${key} with ID ${id}:`, error);
        }
    },
};

export default firebaseProvider;