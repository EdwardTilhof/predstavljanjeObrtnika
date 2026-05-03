import { ROLE_RANKS } from './PermissonsConst';
import dataFacade from '../services/dataFacade'; 

const hashPassword = (password) => btoa(password); 

export const loginUser = (username, password) => {
  const trimmedUser = username.trim();
  const hashedPassword = hashPassword(password);
  
  return dataFacade.getUserByUsername(trimmedUser).then(user => {
    
    if (user && user.password === hashedPassword) {
      localStorage.setItem('user_role', user.role);
      localStorage.setItem('user_name', user.username);
      return true;
    } else {
      return false; 
    }
  }).catch(error => {
    console.error("Login failed:", error);
    return false;
  });
};

export const registerUser = (userData) => {
  const cleanData = Object.keys(userData).reduce((acc, key) => {
    acc[key] = typeof userData[key] === 'string' ? userData[key].trim() : userData[key];
    return acc;
  }, {});

  return dataFacade.getUserByUsername(cleanData.username).then(existingUser => {
    
    if (existingUser) {
        console.error("Registration failed: Username is already taken.");
        return false; 
    }

    cleanData.password = hashPassword(cleanData.password);
    cleanData.role = 'USER';

    return dataFacade.addUser(cleanData).then(() => {
      localStorage.setItem('user_role', cleanData.role);
      localStorage.setItem('user_name', cleanData.username);
      return true;
    });
  }).catch(error => {
    console.error("Registration failed:", error);
    return false;
  });
};

export const logout = () => {
  localStorage.removeItem('user_role');
  localStorage.removeItem('user_name')
  window.location.href = '/login';
};