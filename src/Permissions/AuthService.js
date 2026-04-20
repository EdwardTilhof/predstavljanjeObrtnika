import { ROLE_RANKS } from './PermissonsConst';

export const loginUser = (username, password) => {
  const trimmedUser = username.trim();
  
  // Default Admin Check
  if (trimmedUser === 'admin' && password === '0000') {
    localStorage.setItem('user_role', 'ADMIN');
    localStorage.setItem('user_name', 'Admin');
    return true;
  }
  
  // For learning: any other login defaults to 'USER'
  localStorage.setItem('user_role', 'USER');
  localStorage.setItem('user_name', trimmedUser);
  return true;
};

export const registerUser = (userData) => {
  // Trim all string inputs
  const cleanData = Object.keys(userData).reduce((acc, key) => {
    acc[key] = typeof userData[key] === 'string' ? userData[key].trim() : userData[key];
    return acc;
  }, {});

  console.log("Registered User:", cleanData);
  localStorage.setItem('user_role', 'USER');
  localStorage.setItem('user_name', cleanData.username);
  return true;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};