// Mock data generator for Users
const generateRandomUser = (index) => ({
    id: `user-${index}`,
    username: `user${index}`,
    password: `pass${index}`, 
    role: index % 5 === 0 ? 'MODERATOR' : 'USER',
});

export const MOCK_USERS_DATA = {
    default: Array.from({ length: 20 }, (_, i) => generateRandomUser(i + 1))
};