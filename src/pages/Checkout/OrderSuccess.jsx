// src/pages/Checkout/OrderSuccess.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import styles from "../../assets/styles/checkout/OrderSuccess.module.css";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.state?.orderId || "—";
  const totalAmount = location.state?.totalAmount || null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <FiCheckCircle className={styles.icon} />
          </div>

          <h1 className={styles.title}>Order placed successfully 🎉</h1>
          <p className={styles.subtitle}>
            Thank you for choosing <strong>House of Intimacy</strong>.
            Your order is now in good hands.
          </p>

          <div className={styles.infoBox}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Order ID</span>
              <span className={styles.valueMono}>{orderId}</span>
            </div>
            {totalAmount && (
              <div className={styles.infoRow}>
                <span className={styles.label}>Amount paid</span>
                <span className={styles.value}>₹{totalAmount}</span>
              </div>
            )}
            <div className={styles.infoRow}>
              <span className={styles.label}>Status</span>
              <span className={styles.statusPill}>Placed</span>
            </div>
            <p className={styles.tipText}>
              You’ll receive an email with all the details. We’ll keep you
              updated as your order moves from packed to delivered.
            </p>
          </div>

          <div className={styles.buttonsRow}>
            <button
              className={styles.primaryBtn}
              onClick={() => navigate("/account/orders")}
            >
              View my orders
            </button>
            <button
              className={styles.secondaryBtn}
              onClick={() => navigate("/")}
            >
              Continue shopping
            </button>
          </div>

          <p className={styles.footerNote}>
            Need help with this order?{" "}
            <button
              className={styles.inlineLink}
              onClick={() => navigate("/contact")}
            >
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
