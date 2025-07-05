import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all admin data
  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        axios.get("/api/admin/products"),
        axios.get("/api/admin/orders"),
        axios.get("/api/admin/users"),
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  };

  // Product management
  const addProduct = async (productData) => {
    try {
      const { data } = await axios.post("/api/admin/products", productData);
      setProducts((prev) => [...prev, data.product]);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const { data } = await axios.put(
        `/api/admin/products/${id}`,
        productData
      );
      setProducts((prev) => prev.map((p) => (p._id === id ? data.product : p)));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Order management
  const updateOrderStatus = async (id, status) => {
    try {
      const { data } = await axios.put(`/api/admin/orders/${id}`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? data.order : o)));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  const value = {
    products,
    orders,
    users,
    loading,
    error,
    fetchAdminData,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
