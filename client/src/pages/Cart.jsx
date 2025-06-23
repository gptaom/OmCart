import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/CartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const cartItems  = useSelector((state) => state.cart.items || []);

  const handleRemove = (id) => dispatch(removeFromCart(id));

  const handleQuantityChange = (id, qty) => {
    if (qty > 0) dispatch(updateQuantity({ id, quantity: qty }));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty.{' '}
          <Link to="/products" className="text-blue-600 underline">
            Go Shopping
          </Link>
        </p>
      ) : (
        <>
          {/* Cart items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    className="px-2 bg-gray-200 rounded"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 bg-gray-200 rounded"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Subtotal + Checkout */}
          <div className="text-right mt-6 text-xl font-semibold">
            Subtotal: ${subtotal.toFixed(2)}
          </div>

          <div className="text-right mt-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50"
              disabled={cartItems.length === 0}
              onClick={() => navigate('/shipping')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
