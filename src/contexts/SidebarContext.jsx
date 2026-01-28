import { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isQuickAddOpen, setQuickAddOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openQuickAdd = (product) => {
    setSelectedProduct(product);
    setQuickAddOpen(true);
  };

  const closeQuickAdd = () => {
    setQuickAddOpen(false);
    setSelectedProduct(null);
  };

  return (
    <SidebarContext.Provider
      value={{
        isQuickAddOpen,
        selectedProduct,
        openQuickAdd,
        closeQuickAdd,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};