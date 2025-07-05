import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const Tab = styled(motion.div)`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ active, theme }) =>
      active ? theme.colors.primaryGreen : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.colors.primaryDark : theme.colors.lightGray};
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

function AuthModal() {
  const {
    authModalOpen,
    authModalType,
    closeAuthModal,
    setAuthModalType,
    loginUser,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (authModalType === "login") {
        await loginUser(formData.email, formData.password);
      } else {
        // Signup logic
        const response = await axios.post("/api/auth/signup", formData);
        if (response.data.success) {
          await loginUser(formData.email, formData.password);
        }
      }
      closeAuthModal();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!authModalOpen) return null;

  return (
    <ModalOverlay onClick={closeAuthModal}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <TabContainer>
          <Tab
            active={authModalType === "login"}
            onClick={() => setAuthModalType("login")}
            whileHover={{ scale: 1.05 }}
          >
            Login
          </Tab>
          <Tab
            active={authModalType === "signup"}
            onClick={() => setAuthModalType("signup")}
            whileHover={{ scale: 1.05 }}
          >
            Sign Up
          </Tab>
        </TabContainer>

        <form onSubmit={handleSubmit}>
          {authModalType === "signup" && (
            <FormGroup>
              <FormLabel>Full Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          )}

          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="6"
            />
          </FormGroup>

          {authModalType === "signup" && (
            <>
              <FormGroup>
                <FormLabel>Address</FormLabel>
                <FormInput
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>City</FormLabel>
                <FormInput
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>State</FormLabel>
                <FormInput
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Pincode</FormLabel>
                <FormInput
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading
              ? "Processing..."
              : authModalType === "login"
              ? "Login"
              : "Sign Up"}
          </SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default AuthModal;
