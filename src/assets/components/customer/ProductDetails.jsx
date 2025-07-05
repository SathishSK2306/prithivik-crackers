import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "/src/assets/components/context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-[#259745] text-2xl font-bold mb-4">
            ₹{product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <label className="mr-4">Quantity:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border rounded px-3 py-1 w-20"
            />
          </div>

          <button
            onClick={() => addToCart({ ...product, quantity })}
            className="bg-[#259745] hover:bg-[#1e7e3a] text-white px-6 py-3 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
