import { ROLE_RANKS } from './PermissonsConst';
import dataFacade from '../services/dataFacade'; // Import dataFacade

// Basic client-side password hashing (for demonstration, NOT for production)
// In a real application, passwords should be hashed and verified on a secure backend.
const hashPassword = (password) => btoa(password); // Simple base64 encoding

export const loginUser = (username, password) => {
  const trimmedUser = username.trim();
  const hashedPassword = hashPassword(password);
  
  // Fetch all users and find a match
  return dataFacade.getUsers().then(users => {
    const user = users.find(u => u.username.toLowerCase() === trimmedUser.toLowerCase() && u.password === hashedPassword);

    if (user) {
      localStorage.setItem('user_role', user.role);
      localStorage.setItem('user_name', user.username);
      return true;
    } else {
      return false; // No matching user found
    }
  }).catch(error => {
    console.error("Login failed:", error);
    return false;
  });
};

export const registerUser = (userData) => {
  // Trim all string inputs
  const cleanData = Object.keys(userData).reduce((acc, key) => {
    acc[key] = typeof userData[key] === 'string' ? userData[key].trim() : userData[key];
    return acc;
  }, {});

  // Hash the password before storing
  cleanData.password = hashPassword(cleanData.password);
  // Assign a default role for new registrations
  cleanData.role = 'USER';

  return dataFacade.addUser(cleanData).then(() => {
    localStorage.setItem('user_role', cleanData.role);
    localStorage.setItem('user_name', cleanData.username);
    return true;
  }).catch(error => {
    console.error("Registration failed:", error);
    return false;
  });
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};