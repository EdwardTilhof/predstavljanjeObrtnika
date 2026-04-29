// Mock data generator for Users
const generateRandomUser = (index) => ({
    id: `user-${index}`,
    username: `user${index}`,
    password: `pass${index}`, // This will be hashed during initialization
    role: index % 5 === 0 ? 'MODERATOR' : 'USER', // Every 5th user is a MODERATOR
});

export const MOCK_USERS_DATA = {
    default: Array.from({ length: 20 }, (_, i) => generateRandomUser(i + 1))
};