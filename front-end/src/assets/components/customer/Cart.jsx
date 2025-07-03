import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import CartItem from "../comman/CartItem";
import CheckoutForm from "../comman/CheckoutForm";

const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CartTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primaryDark};
  margin-bottom: 2rem;
`;

const CartItemsContainer = styled.div`
  margin-bottom: 2rem;
`;

const SummaryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  padding: 1.5rem;
  border-radius: 8px;
`;

const SummaryTitle = styled.h2`
  color: ${({ theme }) => theme.colors.lightGreen};
  margin-bottom: 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const TotalRow = styled(SummaryRow)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightGreen};
  font-size: 1.2rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const CheckoutButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 1.5rem;
`;

function Cart() {
  const { cartItems, totalPrice, deliveryCharge, clearCart } =
    useContext(CartContext);
  const { currentUser, showAuthModal } = useContext(AuthContext);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const navigate = useNavigate();

  const subtotal = totalPrice - deliveryCharge;

  const handleCheckout = () => {
    if (!currentUser) {
      showAuthModal("login");
      return;
    }
    setShowCheckoutForm(true);
  };

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <CartTitle>Your Cart is Empty</CartTitle>
        <motion.button
          onClick={() => navigate("/products")}
          whileHover={{ scale: 1.05 }}
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#259745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Continue Shopping
        </motion.button>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>Your Cart</CartTitle>

      <CartItemsContainer>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </CartItemsContainer>

      <SummaryContainer>
        <SummaryTitle>Order Summary</SummaryTitle>
        <SummaryRow>
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Delivery Charge</span>
          <span>₹{deliveryCharge.toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Discount</span>
          <span>- ₹0.00</span>
        </SummaryRow>
        <TotalRow>
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </TotalRow>

        {showCheckoutForm ? (
          <CheckoutForm
            cartItems={cartItems}
            totalPrice={totalPrice}
            onSuccess={() => {
              clearCart();
              navigate("/");
            }}
          />
        ) : (
          <CheckoutButton
            onClick={handleCheckout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Checkout
          </CheckoutButton>
        )}
      </SummaryContainer>
    </CartContainer>
  );
}

export default Cart;
