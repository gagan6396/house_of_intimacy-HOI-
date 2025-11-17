import React, { useState } from "react";
import styles from "../assets/styles/ColorsSelector.module.css"; // adjust path if needed

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

const ColorsSelector = ({ items = defaultColors, onChange }) => {
  const [selected, setSelected] = useState(items[0]?.id ?? null);

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
      document.getElementById(`${styles["pill-"]}${next.id}`)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      document.getElementById(`${styles["pill-"]}${prev.id}`)?.focus();
    }
  };

  return (
    <section className={styles["colors-section"]} aria-label="Color selector">
      <div className={styles["colors-container"]}>
        <div className={styles["colors-left"]}>
          <h2 className={styles["colors-title"]}>Your Color, Your Mood</h2>
        </div>

        <div
          className={styles["colors-right"]}
          role="list"
          aria-label="Available colors"
        >
          {items.map((c, idx) => {
            const isSelected = selected === c.id;
            // id needs to be predictable but not collide globally; compose with module-safe prefix
            const pillId = `pill-${c.id}`;
            return (
              <button
                key={c.id}
                id={pillId}
                role="listitem"
                type="button"
                className={`${styles["color-pill"]} ${isSelected ? styles.selected : ""}`}
                aria-pressed={isSelected}
                onClick={() => handleSelect(c.id)}
                onKeyDown={(e) => handleKeyDown(e, c.id, idx)}
              >
                {c.hex === "pattern" ? (
                  <span className={`${styles.dot} ${styles["dot-pattern"]}`} aria-hidden="true" />
                ) : (
                  <span
                    className={styles.dot}
                    style={{ background: c.hex }}
                    aria-hidden="true"
                  />
                )}
                <span className={styles.label}>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ColorsSelector;
