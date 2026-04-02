// AuthLogic.js

// This handles the "memory" source during the current session
let memoryUsers = [
  {
    username: "Admin",
    email: "admin@test.com",
    password: "1234"
  }
];

const AuthLogic = {
  register: async (userData, dataSource) => {
    try {
      if (!userData.email || !userData.password) {
        return { success: false, error: "Missing required fields" };
      }

      if (dataSource === 'localStorage') {
        // 1. Get existing users
        const existingData = localStorage.getItem('users');
        const users = existingData ? JSON.parse(existingData) : [];

        // 2. Check for duplicate email
        if (users.find(u => u.email === userData.email)) {
          return { success: false, error: "User already exists" };
        }

        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

      } else {
        if (memoryUsers.find(u => u.email === userData.email)) {
          return { success: false, error: "User already exists" };
        }
        memoryUsers.push(userData);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  login: async (credentials, dataSource) => {
    try {
      let users = [];

      if (dataSource === 'localStorage') {
        const data = localStorage.getItem('users');
        users = data ? JSON.parse(data) : [];
      } else {
        users = memoryUsers;
      }

      const user = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        return { success: true, user };
      }
      return { success: false, error: "Invalid email or password" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default AuthLogic;