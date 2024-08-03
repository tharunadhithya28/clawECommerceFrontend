import React, { useContext, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, fetchCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <h2>{item.product_id.name}</h2>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
