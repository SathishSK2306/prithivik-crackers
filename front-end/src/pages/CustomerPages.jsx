import Home from "../assets/components/customer/Home";
import Products from "../assets/components/customer/Products";
import ProductDetails from "../assets/components/customer/ProductDetails";
import About from "../assets/components/customer/About";
import Contact from "../assets/components/customer/Contact";
import Cart from "../assets/components/customer/Cart";
// import Checkout from "../assets/components/customer/Checkout";
import Footer from "../assets/components/comman/Footer";
import Header from "../assets/components/comman/Header";
import { Routes, Route } from "react-router-dom";

export default function CustomerPages() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
