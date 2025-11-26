// src/components/cart/CartDrawer.jsx
import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiX,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiChevronRight,
} from 'react-icons/fi';

import styles from '../../assets/styles/cart/CartDrawer.module.css';
import { CartContext } from '../../contexts/CartContext';
import { WishlistContext } from '../../contexts/WishlistContext';

const API_BASE_URL = 'http://localhost:8000';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL}${url}`;
};

const FREE_SHIPPING_THRESHOLD = 999; // change as per your logic

function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const {
    cartItems = [],
    incrementQty,
    decrementQty,
    removeFromCart,
    addToCart,
  } = useContext(CartContext);

  const { wishlistItems = [] } = useContext(WishlistContext);

  const [couponCode, setCouponCode] = useState('');

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0,
      ),
    [cartItems],
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cartItems],
  );

  const remainingForFreeShipping =
    FREE_SHIPPING_THRESHOLD - cartSubtotal > 0
      ? FREE_SHIPPING_THRESHOLD - cartSubtotal
      : 0;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout'); // change route if needed
  };

  const handleAddWishlistItem = (product) => {
    if (addToCart) addToCart(product, 1);
  };

  const handleOverlayClick = (e) => {
    // close when clicking on dark overlay only
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      onClick={handleOverlayClick}
    >
      <aside className={styles.drawer}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.cartTitle}>Cart</span>
            <span className={styles.itemCount}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <span className={styles.headerDivider}>|</span>
            <span className={styles.headerAmount}>₹ {cartSubtotal}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        {/* BODY SCROLL AREA */}
        <div className={styles.body}>
          {/* CART ITEMS */}
          <div className={styles.cartItemsWrapper}>
            {cartItems.length === 0 ? (
              <div className={styles.emptyState}>
                Your bag is empty. Start shopping!
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id || item.id} className={styles.cartItem}>
                  <div className={styles.itemImageWrap}>
                    <img
                      src={getImageUrl(item.mainImage || item.image)}
                      alt={item.name}
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.itemContent}>
                    <div className={styles.itemTopRow}>
                      <div>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemMeta}>
                          {item.color || item.shade} | {item.size}
                        </p>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() =>
                          removeFromCart &&
                          removeFromCart(item._id || item.id)
                        }
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className={styles.itemPriceRow}>
                      <div className={styles.priceBlock}>
                        {item.mrp && item.mrp > item.price ? (
                          <>
                            <span className={styles.mrp}>₹ {item.mrp}</span>
                            <span className={styles.price}>₹ {item.price}</span>
                          </>
                        ) : (
                          <span className={styles.price}>₹ {item.price}</span>
                        )}
                      </div>

                      <div className={styles.qtyControls}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() =>
                            decrementQty &&
                            decrementQty(item._id || item.id)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus />
                        </button>
                        <span className={styles.qtyValue}>
                          {item.quantity || 1}
                        </span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() =>
                            incrementQty &&
                            incrementQty(item._id || item.id)
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>

                    <p className={styles.returnInfo}>
                      {item.returnInfo || '14 days return available'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* COUPON SECTION */}
          <div className={styles.couponCard}>
            <button className={styles.viewOffersBtn}>
              <span>View available offers</span>
              <FiChevronRight />
            </button>

            <div className={styles.couponInputRow}>
              <input
                type="text"
                placeholder="Enter Discount Code"
                className={styles.couponInput}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className={styles.couponApplyBtn}>APPLY</button>
            </div>

            <p className={styles.couponHint}>
              Please apply giftcard in the next step
            </p>
          </div>

          {/* ADD FROM WISHLIST */}
          {wishlistItems && wishlistItems.length > 0 && (
            <div className={styles.wishlistSection}>
              <h3 className={styles.wishlistTitle}>Add from Wishlist</h3>

              <div className={styles.wishlistGrid}>
                {wishlistItems.map((prod) => (
                  <div
                    key={prod._id || prod.id}
                    className={styles.wishlistCard}
                  >
                    <div className={styles.wishlistImgWrap}>
                      <img
                        src={getImageUrl(prod.mainImage || prod.image)}
                        alt={prod.name}
                        className={styles.wishlistImg}
                      />
                    </div>
                    <div className={styles.wishlistBody}>
                      <p className={styles.wishlistName}>{prod.name}</p>
                      <p className={styles.wishlistPrice}>₹ {prod.price}</p>
                      <button
                        className={styles.wishlistAddBtn}
                        onClick={() => handleAddWishlistItem(prod)}
                      >
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ height: '80px' }} />
        </div>

        {/* FREE SHIPPING BAR */}
        <div className={styles.shippingBar}>
          {remainingForFreeShipping > 0 ? (
            <span>
              Add ₹ {remainingForFreeShipping} more for free shipping !!
            </span>
          ) : (
            <span>Eligible for free shipping !!</span>
          )}
        </div>

        {/* STICKY FOOTER CHECKOUT */}
        <div className={styles.footer}>
          <button className={styles.checkoutBtn} onClick={handleCheckout}>
            <span>CHECK OUT</span>
            <span>₹ {cartSubtotal}</span>
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;
