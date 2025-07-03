import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col md:flex-row border-b py-4">
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-grow md:ml-4 mt-4 md:mt-0">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-[#259745] font-bold">₹{item.price}</p>

        <div className="flex items-center mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 px-2 py-1 rounded"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="mx-4">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 px-2 py-1 rounded"
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4 md:mt-0">
        <p className="text-lg font-bold">
          ₹{(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 mt-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
