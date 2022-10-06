import React from "react";
import { Product } from "../../models/models";
import { Wrapper } from "./Cart.styles";
import CartItem from "../CartItem/CartItem";

interface CartProps {
  cartItems: Product[];
  addToCart: (clicked: Product) => void;
  removeFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  const calculateTotal = (items: Product[]) =>
    items.reduce((ack: number, item) => ack + item.amount! * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
