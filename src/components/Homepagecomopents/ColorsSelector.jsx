import React, { useState } from "react";
import styles from "../../assets/styles/ColorsSelector.module.css";

import swiwearstyle from "../../assets/styles/Swimwear.module.css";
import { useColorModeValue } from "@chakra-ui/react";

import img5 from "../../assets/images/5.jpg";
import img17 from "../../assets/images/17.jpg";
import img19 from "../../assets/images/19.jpg";

const defaultColors = [
  { id: "blush", name: "BLUSH RUSH", hex: "#ff6fb6" },
  { id: "desert", name: "DESERT MOSS", hex: "#c9c27a" },
  { id: "midnight", name: "MIDNIGHT", hex: "#000000" },
  { id: "scarlet", name: "SCARLET HEAT", hex: "#c43b28" },
  { id: "pearl", name: "SOFT PEARL", hex: "#f5f2ef" },
  { id: "tropic", name: "TROPIC MIX", hex: "#2fb24a" },
  { id: "coastal", name: "COASTAL SKY", hex: "#2060ff" },
  { id: "lemon", name: "LEMON BLUSH", hex: "#ffc84b" },
  { id: "cocoa", name: "COCOA CLAY", hex: "#7a3f12" },
  { id: "ink", name: "INK STRIPE", hex: "pattern" }, // special pattern
];

const products = [
  {
    id: 1,
    name: "Tropic Tides Ring Wrap Bikini Set",
    image: img5,
    price: "Rs. 1,649.99",
    originalPrice: "Rs. 1,699.99",
    colors: [img5, img19, img17, img5],
  },
  {
    id: 2,
    name: "Sunset Mirage Cut-Out Bikini Set",
    image: img17,
    price: "Rs. 2,249.00",
    originalPrice: "Rs. 2,399.00",
    colors: [img5, img19, img17, img5],
  },
  {
    id: 3,
    name: "Textured Square-Neck Bikini Set",
    image: img5,
    price: "Rs. 2,499.99",
    originalPrice: "Rs. 2,649.00",
    colors: [img5, img19, img17, img5],
  },
  {
    id: 4,
    name: "Textured Triangle Bikini Set",
    image: img19,
    price: "Rs. 1,799.99",
    originalPrice: "Rs. 1,999.99",
    colors: [img5, img19, img17, img5],
  },
];


const ColorsSelector = ({ items = defaultColors, onChange }) => {
  const [selected, setSelected] = useState(items[0]?.id ?? null);

  // 🎨 Chakra color-mode aware values
  const sectionBg = useColorModeValue("#f9fafb", 'linear-gradient(135deg, #ffdeefff 0%, #ffcbe4ff 50%, #ffd2e6ff 100%)'); // light / dark bg
  const titleColor = useColorModeValue("#0f172a", "#090909ff");
  const labelColor = useColorModeValue("#111827", "#e5e7eb");
  const pillBg = useColorModeValue("#ffffff", "rgba(83, 88, 100, 0.85)");
  const pillBorder = useColorModeValue("#e5e7eb", "#78808cff");
  const pillSelectedBg = useColorModeValue("#0f172a", "#f9fafb");
  const pillSelectedText = useColorModeValue("#f9fafb", "#020617");
  const dotBorder = useColorModeValue("#e5e7eb", "#858d9aff");
  const cardBg = useColorModeValue("#f9fafb", 'linear-gradient(135deg, #ffdeefff 0%, #ffcbe4ff 50%, #ffd2e6ff 100%)');
  const cardBorder = useColorModeValue("#e5e7eb", "#1f2937");
  const iconStroke = useColorModeValue("#111827", "#000000ff");
  const sectionText = useColorModeValue("#0f172a", "#0c0c0cff");
  const buttonBg = useColorModeValue("#111827", "#e5e7eb");
  const buttonText = useColorModeValue("#f9fafb", "#020617");
  const priceColor = useColorModeValue("#111827", "#080808ff");
  const originalPriceColor = useColorModeValue("#6b7280", "#9ca3af");

  const handleSelect = (id) => {
    setSelected(id);
    if (typeof onChange === "function") onChange(id);
  };

  const handleKeyDown = (e, id, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(id);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      document.getElementById(`pill-${next.id}`)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      document.getElementById(`pill-${prev.id}`)?.focus();
    }
  };

  return (
    <>
    <section
      className={styles["colors-section"]}
      aria-label="Color selector"
      style={{ background: sectionBg, color: labelColor }}
    >
      <div className={styles["colors-container"]}>
        <div className={styles["colors-left"]}>
          <h2
            className={styles["colors-title"]}
            style={{ color: titleColor }}
          >
            Your Color, Your Mood
          </h2>
        </div>

        <div
          className={styles["colors-right"]}
          role="list"
          aria-label="Available colors"
        >
          {items.map((c, idx) => {
            const isSelected = selected === c.id;
            const pillId = `pill-${c.id}`;

            return (
              <button
                key={c.id}
                id={pillId}
                role="listitem"
                type="button"
                className={`${styles["color-pill"]} ${
                  isSelected ? styles.selected : ""
                }`}
                style={{
                  background: isSelected ? pillSelectedBg : pillBg,
                  borderColor: pillBorder,
                  color: isSelected ? pillSelectedText : labelColor,
                }}
                aria-pressed={isSelected}
                onClick={() => handleSelect(c.id)}
                onKeyDown={(e) => handleKeyDown(e, c.id, idx)}
              >
                {c.hex === "pattern" ? (
                  <span
                    className={`${styles.dot} ${styles["dot-pattern"]}`}
                    aria-hidden="true"
                    style={{
                      borderColor: dotBorder,
                    }}
                  />
                ) : (
                  <span
                    className={styles.dot}
                    style={{
                      background: c.hex,
                      borderColor: dotBorder,
                    }}
                    aria-hidden="true"
                  />
                )}
                <span className={styles.label}>
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>

    <section
      className={swiwearstyle.swimwearSection}
      style={{ background: sectionBg, color: sectionText }}
    >
      <div className={swiwearstyle.container}>
        {/* Header */}
        <div className={swiwearstyle.sectionHeader}>
          <h2 className={swiwearstyle.sectionTitle}>{`Effortless Comfort, Bold Confidence`}</h2>

          <div className={swiwearstyle.headerButtons}>
            <button
              className={swiwearstyle.btnViewAll}
              style={{ background: buttonBg, color: buttonText }}
            >
              View All Newest Products
              <span className={swiwearstyle.arrowIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={iconStroke}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>

            <div className={swiwearstyle.navButtons}>
              <button className={swiwearstyle.btnNav}>
                <svg viewBox="0 0 24 24" fill="none" stroke={iconStroke}>
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button className={swiwearstyle.btnNav}>
                <svg viewBox="0 0 24 24" fill="none" stroke={iconStroke}>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className={swiwearstyle.productGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              className={swiwearstyle.productCard}
              style={{
                background: cardBg,
                borderColor: cardBorder,
              }}
            >
              <div className={swiwearstyle.productImageWrapper}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={swiwearstyle.productImage}
                />

                <button
                  className={swiwearstyle.quickViewBtn}
                  title="Quick View"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={iconStroke}
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>

              <div className={swiwearstyle.productInfo}>
                <h3 className={swiwearstyle.productName}>{product.name}</h3>

                <div className={swiwearstyle.productPricing}>
                  <span
                    className={swiwearstyle.productPrice}
                    style={{ color: priceColor }}
                  >
                    From {product.price}
                  </span>
                  <span
                    className={swiwearstyle.productOriginalPrice}
                    style={{ color: originalPriceColor }}
                  >
                    {product.originalPrice}
                  </span>
                </div>

                <div className={swiwearstyle.colorSwatches}>
                  {product.colors.map((color, idx) => (
                    <img
                      key={idx}
                      src={color}
                      className={swiwearstyle.colorThumb}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
        </>
  );
};

export default ColorsSelector;
