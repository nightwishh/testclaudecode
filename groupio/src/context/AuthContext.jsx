import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('groupio_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login - in production, this would be an API call
    const users = JSON.parse(localStorage.getItem('groupio_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const userWithoutPassword = { id: user.id, name: user.name, email: user.email, avatar: user.avatar };
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('groupio_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = (name, email, password) => {
    // Simulate registration - in production, this would be an API call
    const users = JSON.parse(localStorage.getItem('groupio_users') || '[]');

    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    users.push(newUser);
    localStorage.setItem('groupio_users', JSON.stringify(users));

    const userWithoutPassword = { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar };
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('groupio_user', JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('groupio_user');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
