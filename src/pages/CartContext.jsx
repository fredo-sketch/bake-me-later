import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, amount) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + amount;

        if (newQuantity <= 0) {
          return prevItems.filter((item) => item.id !== product.id);
        }

        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item));
      } else {
        if (amount > 0) {
          return [...prevItems, { ...product, quantity: amount }];
        }
        return prevItems;
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // PERBAIKAN: Fungsi hitung total harga yang mendukung tipe data Angka (Database) maupun Teks
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      let numericPrice = 0;

      if (typeof item.price === "number") {
        // Jika dari database sudah berupa angka murni (seperti saat ini)
        numericPrice = item.price;
      } else if (item.price) {
        // Jika bentuknya string (jaga-jaga kalau ada sisa mock data lama)
        numericPrice = parseInt(String(item.price).replace(/[^\d]/g, ""), 10) || 0;
      }

      return total + numericPrice * item.quantity;
    }, 0);
  };

  return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalPrice }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
