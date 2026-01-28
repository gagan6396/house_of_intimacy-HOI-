// src/components/cart/QuickAddDrawer.jsx
import React, { useContext, useState } from 'react';
import { SidebarContext } from '../../contexts/SidebarContext';
import { CartContext } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/cart/QuickAddDrawer.module.css';

const getUnitPrice = (product) => {
  if (!product) return 0;

  if (typeof product.price === 'number') return product.price;

  return (
    product.price?.sellingPrice ||
    product.price?.sale ||
    product.price?.finalPrice ||
    product.price?.mrp ||
    0
  );
};

const QuickAddDrawer = () => {
  const navigate = useNavigate();

  const { isQuickAddOpen, selectedProduct, closeQuickAdd } =
    useContext(SidebarContext);

  const { addToCart } = useContext(CartContext);

  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);

  if (!isQuickAddOpen || !selectedProduct) return null;

  const unitPrice = getUnitPrice(selectedProduct);
  const mrp =
    selectedProduct.price?.mrp ||
    selectedProduct.mrp ||
    unitPrice;

  const handleAddToCart = () => {
    addToCart(
      {
        ...selectedProduct,
        _id: selectedProduct._id || selectedProduct.id, // ✅ MUST
      },
      {
        size,
        color,
        quantity: 1,
      }
    );

    closeQuickAdd();
  };

 return (
  <div className={styles.overlay} onClick={closeQuickAdd}>
    <aside
      className={styles.drawer}
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          {selectedProduct.brand && (
            <div className={styles.brand}>
              {selectedProduct.brand}
            </div>
          )}
          <h3 className={styles.title}>
            {selectedProduct.name}
          </h3>
        </div>

        <button className={styles.closeBtn} onClick={closeQuickAdd}>
          ✕
        </button>
      </div>

      {/* IMAGE */}
      <div className={styles.imageWrap}>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
        />
      </div>

      {/* PRICE */}
      <div className={styles.priceRow}>
        <span className={styles.price}>₹ {unitPrice}</span>
        {mrp > unitPrice && (
          <span className={styles.mrp}>₹ {mrp}</span>
        )}
      </div>

      {/* SELECTED INFO */}
      {(color || size) && (
        <div className={styles.selectedInfo}>
          {color && (
            <span className={styles.infoChip}>
              Color: <strong>{color}</strong>
            </span>
          )}
          {size && (
            <span className={styles.infoChip}>
              Size: <strong>{size}</strong>
            </span>
          )}
        </div>
      )}

      {/* COLORS */}
      <div className={styles.section}>
        <p className={styles.label}>Select Color</p>
        <div className={styles.colorRow}>
          {selectedProduct.colors?.map((c, i) => (
            <button
              key={i}
              className={`${styles.colorDot} ${
                color === c ? styles.active : ''
              }`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
              title={c}
            />
          ))}
        </div>
      </div>

      {/* SIZES */}
      <div className={styles.section}>
        <p className={styles.label}>Select Size</p>
        <div className={styles.sizeRow}>
          {['S', 'M', 'L', 'XL'].map((s) => (
            <button
              key={s}
              className={`${styles.sizeBtn} ${
                size === s ? styles.active : ''
              }`}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        <button
          className={styles.addBtn}
          disabled={!size || !color}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <button
          className={styles.viewBtn}
          onClick={() =>
            navigate(`/product/${selectedProduct.id}`)
          }
        >
          View Product Details
        </button>
      </div>
    </aside>
  </div>
);
};

export default QuickAddDrawer;