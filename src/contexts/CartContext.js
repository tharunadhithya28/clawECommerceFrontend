import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.payload);
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  const addToCart = async (product) => {
    try {
      const response = await axios.post('/api/cart/add', product);
      dispatch({ type: 'ADD_TO_CART', payload: response.data });
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`/api/cart/remove/${id}`);
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } catch (error) {
      console.error('Failed to remove from cart', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
