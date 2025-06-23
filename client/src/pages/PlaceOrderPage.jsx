import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { clearCart } from '../store/CartSlice';

const PlaceOrderPage = () => {
  const { items, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const placeOrderHandler = async () => {

    
    if (!userInfo || !userInfo.token) {
    alert('You must be logged in to place an order.');
    navigate('/login');
    return;
  }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const order = {
  orderItems: items.map((item) => ({
    name: item.name,
    qty: item.quantity,
    price: item.price,
    image: item.image,
    product: item._id,
  })),
  shippingAddress,
  paymentMethod,
  itemsPrice: subtotal,
  totalPrice: subtotal, // you can add tax, shipping later
};

      const { data } = await axios.post('/api/orders', order, config);

      dispatch(clearCart());
      localStorage.removeItem('cartItems');
      navigate('/order-confirmation', { state: { order: data } });
    } catch (err) {
      console.error(err);
      alert('Order failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Review & Place Order</h2>

      <div className="mb-6">
        <h3 className="font-semibold mb-1">Shipping:</h3>
        <p>{shippingAddress.fullName}, {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.country} - {shippingAddress.postalCode}</p>

        <h3 className="font-semibold mt-4 mb-1">Payment Method:</h3>
        <p>{paymentMethod}</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">{item.quantity} × ${item.price}</p>
            </div>
            <p>${(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="text-right mt-6 font-bold text-xl">
        Total: ${subtotal.toFixed(2)}
      </div>

      <button
        onClick={placeOrderHandler}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrderPage;
