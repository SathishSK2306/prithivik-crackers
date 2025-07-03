import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./assets/components/context/CartContext";
import { AuthProvider } from "./assets/components/context/AuthContext";
import { AdminProvider } from "./assets/components/context/AdminContext";
import { NotificationProvider } from "./assets/components/context/NotificationContext";
import { LoadingProvider } from "./assets/components/context/LoadingContext";

import CustomerPages from "./pages/CustomerPages";
import AdminPages from "./pages/AdminPages";
import ScrollToTop from "./assets/components/comman/ScrollToTop";
import Notification from "./assets/components/comman/Notification";
import PageLoader from "./assets/components/comman/PageLoader";

function App() {
  useEffect(() => {
    const handleWindowError = (error) => {
      console.error("Global error:", error);
    };

    window.addEventListener("error", handleWindowError);
    return () => window.removeEventListener("error", handleWindowError);
  }, []);

  return (
    <Router>
      {" "}
      {/* ✅ Router comes FIRST */}
      <NotificationProvider>
        <LoadingProvider>
          <AuthProvider>
            <CartProvider>
              <AdminProvider>
                <ScrollToTop />
                <Notification />
                <PageLoader />
                <Routes>
                  <Route path="/*" element={<CustomerPages />} />
                  <Route path="/admin/*" element={<AdminPages />} />
                </Routes>
              </AdminProvider>
            </CartProvider>
          </AuthProvider>
        </LoadingProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;
