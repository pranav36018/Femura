import { useState, useEffect } from 'react';

export function useSampleBasket() {
  const [basket, setBasket] = useState(() => {
    try {
      const saved = localStorage.getItem('femura_sample_basket');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.filter(item => item && item.product && item.product.id) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('femura_sample_basket', JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (product, quantity = 1) => {
    setBasket(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromBasket = (productId) => {
    setBasket(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromBasket(productId);
      return;
    }
    setBasket(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0);

  return {
    basket,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    clearBasket,
    totalItems,
    isDrawerOpen,
    setIsDrawerOpen
  };
}
