import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import CustomerManagement from "./CustomerManagement";

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.lightGreen};
  padding: 2rem 1rem;
`;

const SidebarTitle = styled.h2`
  margin-bottom: 2rem;
  padding-left: 1rem;
`;

const SidebarLink = styled(motion.div)`
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.secondaryDark : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.primaryGreen : theme.colors.lightGreen};
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
`;

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductManagement />;
      case "orders":
        return <OrderManagement />;
      case "customers":
        return <CustomerManagement />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <AdminContainer>
      <Sidebar>
        <SidebarTitle>Admin Panel</SidebarTitle>
        <SidebarLink
          active={activeTab === "products"}
          onClick={() => setActiveTab("products")}
          whileHover={{ x: 5 }}
        >
          Product Management
        </SidebarLink>
        <SidebarLink
          active={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
          whileHover={{ x: 5 }}
        >
          Order Management
        </SidebarLink>
        <SidebarLink
          active={activeTab === "customers"}
          onClick={() => setActiveTab("customers")}
          whileHover={{ x: 5 }}
        >
          Customer Management
        </SidebarLink>
        <SidebarLink
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          whileHover={{ x: 5 }}
        >
          Logout
        </SidebarLink>
      </Sidebar>

      <MainContent>{renderTabContent()}</MainContent>
    </AdminContainer>
  );
}

export default AdminDashboard;
