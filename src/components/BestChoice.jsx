// BestChoice.jsx
import React from "react";
import styles from "../assets/styles/BestChoice.module.css";
import img5 from "../assets/images/5.jpg";
import img17 from "../assets/images/17.jpg";
import img19 from "../assets/images/19.jpg";

const items = [
  {
    id: 1,
    title: "Sand Dune One-piece Tankini",
    price: "$112.00",
    img: img5,
    thumb: img19,
  },
  {
    id: 2,
    title: "Sunburst Bikini",
    price: "$199.00",
    img: img17,
    thumb: img19,
  },
  {
    id: 3,
    title: "Tidal Temptation Bikini",
    priceOld: "$149.00",
    price: "$112.00",
    img: img19,
    thumb: img5,
  },
  {
    id: 4,
    title: "Tropicana Monokini",
    price: "$89.00",
    img: img5,
    thumb: img19,
  },
];

export default function BestChoice() {
  return (
    <section className={styles.bestChoiceSection}>
      <div className={styles.container}>
        <div className={styles.bcHeader}>
          <h2 className={styles.bcTitle}>Best Choice</h2>

          <div className={styles.bcControls} aria-hidden>
            <button
              className={styles.bcArrow}
              title="previous"
              aria-label="previous"
            >
              ‹
            </button>
            <button
              className={styles.bcArrow}
              title="next"
              aria-label="next"
            >
              ›
            </button>
          </div>
        </div>

        <div className={styles.bcGrid}>
          {items.map((it) => (
            <article key={it.id} className={styles.bcCard}>
              <div
                className={styles.bcImage}
                style={{ backgroundImage: `url(${it.img})` }}
                role="img"
                aria-label={it.title}
              />

              <div className={styles.bcOverlay}>
                <img
                  className={styles.bcThumb}
                  src={it.thumb}
                  alt={`${it.title} thumbnail`}
                />

                <div className={styles.bcMeta}>
                  <div className={styles.bcName}>{it.title}</div>

                  <div className={styles.bcPrice}>
                    {it.priceOld && (
                      <span className={styles.old}>{it.priceOld}</span>
                    )}
                    <span className={styles.now}>
                      {it.price || it.price}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.bcCta}>
          <a href="/products" className={styles.btnGhost}>
            SEE ALL PRODUCTS
          </a>
        </div>
      </div>
    </section>
  );
}
