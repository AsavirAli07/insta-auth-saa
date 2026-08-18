// Mock API service with localStorage persistence
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get users from localStorage
const getUsers = () => {
  const users = localStorage.getItem('instagram_users');
  return users ? JSON.parse(users) : [];
};

// Helper to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem('instagram_users', JSON.stringify(users));
};

// Helper to get current user (if logged in)
export const getCurrentUser = () => {
  const user = localStorage.getItem('instagram_current_user');
  return user ? JSON.parse(user) : null;
};

export const api = {
  login: async (credentials) => {
    await delay(600);
    const { username, password } = credentials;
    
    if (!username || username.trim() === '') {
      throw { message: 'Username is required.' };
    }
    if (!password || password.length < 4) {
      throw { message: 'Password must be at least 4 characters.' };
    }

    // Check if user exists in localStorage
    const users = getUsers();
    const user = users.find(u => 
      u.username.toLowerCase() === username.trim().toLowerCase() && 
      u.password === password
    );

    if (!user) {
      throw { message: 'Invalid username or password.' };
    }

    // Store current user in localStorage (session)
    const currentUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName
    };
    localStorage.setItem('instagram_current_user', JSON.stringify(currentUser));

    return {
      user: currentUser,
      token: 'mock-jwt-token-' + Date.now()
    };
  },

  signup: async (userData) => {
    await delay(700);
    const { username, email, password } = userData;
    
    if (!username || username.trim() === '') {
      throw { message: 'Username is required.' };
    }
    if (!email || !email.includes('@') || !email.includes('.')) {
      throw { message: 'Please enter a valid email address.' };
    }
    if (!password || password.length < 4) {
      throw { message: 'Password must be at least 4 characters.' };
    }

    // Check if username already exists
    const users = getUsers();
    if (users.some(u => u.username.toLowerCase() === username.trim().toLowerCase())) {
      throw { message: 'Username already taken.' };
    }
    if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw { message: 'Email already registered.' };
    }

    // Create new user
    const newUser = {
      id: 'user_' + Date.now(),
      username: username.trim(),
      email: email.trim(),
      password: password, // In real app, this would be hashed
      fullName: username.trim(),
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    users.push(newUser);
    saveUsers(users);

    // Auto-login after signup
    const currentUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      fullName: newUser.fullName
    };
    localStorage.setItem('instagram_current_user', JSON.stringify(currentUser));

    return {
      user: currentUser,
      token: 'mock-signup-jwt-' + Date.now()
    };
  },

  logout: () => {
    localStorage.removeItem('instagram_current_user');
  },

  getAllUsers: () => {
    return getUsers();
  }
};