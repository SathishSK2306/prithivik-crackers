import React, { useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import styled from "styled-components";

const CardContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  width: 250px;
  margin: 1rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  color: ${({ theme }) => theme.colors.lightGreen};
  margin-bottom: 0.5rem;
`;

const ProductPrice = styled.p`
  color: ${({ theme }) => theme.colors.primaryGreen};
  font-weight: bold;
  margin-bottom: 1rem;
`;

const OutOfStock = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  font-style: italic;
`;

const AddButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.primaryGreen};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.lightGray};
    cursor: not-allowed;
  }
`;

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <CardContainer whileHover={{ y: -5 }}>
      <ImageContainer>
        <ProductImage src={product.image} alt={product.name} />
      </ImageContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>₹{product.price}</ProductPrice>
        {product.stock <= 0 ? (
          <OutOfStock>Out of Stock</OutOfStock>
        ) : (
          <AddButton
            onClick={() => addToCart(product)}
            whileTap={{ scale: 0.95 }}
            disabled={product.stock <= 0}
          >
            Add to Cart
          </AddButton>
        )}
      </ProductInfo>
    </CardContainer>
  );
}

export default ProductCard;
