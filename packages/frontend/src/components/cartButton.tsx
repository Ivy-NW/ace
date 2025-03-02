"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cartContext";
import { CartDrawer } from "@/components/cartDrawer";

export const CartButton: React.FC = () => {
  // Use a ref to track the actual state since state updates might be batched
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { state } = useCart();

  useEffect(() => {
    setMounted(true);
    console.log("CartButton mounted, initial drawerOpen:", drawerOpen);
  }, [drawerOpen]);

  // Log when the drawer state changes
  useEffect(() => {
    console.log("CartButton drawerOpen state changed to:", drawerOpen);
  }, [drawerOpen]);

  const toggleCart = useCallback(() => {
    console.log("Toggle cart clicked, current state:", drawerOpen);
    setDrawerOpen(prevState => {
      const newState = !prevState;
      console.log("Setting drawer state to:", newState);
      return newState;
    });
  }, [drawerOpen]);
  
  const closeCart = useCallback(() => {
    console.log("Explicitly closing cart");
    setDrawerOpen(false);
  }, []);

  // Render a loading state on the server and during initial client render
  if (!mounted) {
    return (
      <button
        className="relative p-3 hover:bg-[rgba(123,66,255,0.15)] rounded-full transition-colors duration-300"
        aria-label="Loading cart"
      >
        <ShoppingCart className="h-6 w-6 text-white" />
      </button>
    );
  }

  // Safely calculate item count
  const itemCount = state?.items?.length || 0;

  console.log("CartButton rendering with drawerOpen:", drawerOpen);

  return (
    <>
      <button
        onClick={toggleCart}
        className="relative p-3 hover:bg-[rgba(123,66,255,0.15)] rounded-full transition-colors duration-300"
        aria-label="Shopping cart"
        data-testid="cart-button"
      >
        <ShoppingCart className="h-6 w-6 text-white" />
        {itemCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white 
            rounded-full text-xs min-w-[20px] h-[20px] flex items-center justify-center
            shadow-lg shadow-red-500/30 px-1"
            aria-hidden="true"
          >
            {itemCount}
          </span>
        )}
      </button>
      {/* Force the drawer to be visible for debugging */}
      <CartDrawer 
        isOpen={drawerOpen} 
        onClose={closeCart} 
      />
    </>
  );
};