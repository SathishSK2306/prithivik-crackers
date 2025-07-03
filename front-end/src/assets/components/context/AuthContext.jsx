import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Simulate auth check on app load
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate checking saved login (e.g., from localStorage or just default null)
      setCurrentUser(null); // Or mock a default user
      setLoading(false);
    };
    checkAuth();
  }, []);

  // ✅ Simulate login
  const login = async (email, password) => {
    const isAdmin = email === "admin@test.com";
    const fakeUser = {
      name: isAdmin ? "Admin User" : "Customer User",
      email,
      isAdmin,
    };
    setCurrentUser(fakeUser);
    navigate(isAdmin ? "/admin" : "/");
    return { success: true };
  };

  // ✅ Simulate registration
  const register = async (userData) => {
    const fakeUser = {
      ...userData,
      isAdmin: false,
    };
    setCurrentUser(fakeUser);
    navigate("/");
    return { success: true };
  };

  // ✅ Simulate logout
  const logout = async () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
