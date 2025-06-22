import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/CartSlice';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateQuantity({ id: item._id, quantity: Number(e.target.value) }))
                  }
                  className="w-16 border rounded px-2"
                />
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-xl mt-4">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
