// src/components/JockeyColorSlider/JockeyColorSlider.jsx
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import styles from "../../assets/styles/JockeyColorSlider.module.css";

// Dummy images
import men1 from "../../assets/images/CSC_0015.jpg";
import men2 from "../../assets/images/IMG_4869.JPG";
import men3 from "../../assets/images/CSC_0015.jpg";

import women1 from "../../assets/images/19.jpg";
import women2 from "../../assets/images/5.jpg";
import women3 from "../../assets/images/17.jpg";

// ----- COLORS -----
const COLORS = [
  { id: "black", label: "Black", hex: "#000000" },
  { id: "grey", label: "Grey", hex: "#4B5563" },
  { id: "navy", label: "Navy", hex: "#1F2937" },
  { id: "blue", label: "Blue", hex: "#2563EB" },
  { id: "teal", label: "Teal", hex: "#14B8A6" },
  { id: "green", label: "Green", hex: "#22C55E" },
  { id: "orange", label: "Orange", hex: "#F97316" },
  { id: "red", label: "Red", hex: "#EF4444" },
  { id: "pink", label: "Pink", hex: "#EC4899" },
  { id: "yellow", label: "Yellow", hex: "#FACC15" },
];

// ===== MEN & WOMEN PRODUCTS AUTO-GENERATED =====
const menImages = [men1, men2, men3];
const womenImages = [women1, women2, women3];

// Men: 10 products per color
let menIdCounter = 1;
const MEN_PRODUCTS = COLORS.flatMap((color) =>
  Array.from({ length: 10 }, (_, index) => ({
    id: menIdCounter++,
    name: `Men ${color.label} Product ${index + 1}`,
    subtitle: `Color: ${color.label}`,
    image: menImages[index % menImages.length],
    colorId: color.id,
  }))
);

// Women: 10 products per color
let womenIdCounter = 1;
const WOMEN_PRODUCTS = COLORS.flatMap((color) =>
  Array.from({ length: 10 }, (_, index) => ({
    id: womenIdCounter++,
    name: `Women ${color.label} Product ${index + 1}`,
    subtitle: `Color: ${color.label}`,
    image: womenImages[index % womenImages.length],
    colorId: color.id,
  }))
);

// ----- CUSTOM ARROWS -----
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className={`${styles.arrowBtn} ${styles.arrowRight}`}
      onClick={onClick}
    >
      ❯
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className={`${styles.arrowBtn} ${styles.arrowLeft}`}
      onClick={onClick}
    >
      ❮
    </button>
  );
}

const JockeyColorSlider = () => {
  const [activeGender, setActiveGender] = useState("men");
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const sliderRef = useRef(null); // 👈 slider ka ref

  const activeColor = COLORS[activeColorIndex];

  // kaun sa gender selected hai
  const baseProducts =
    activeGender === "men" ? MEN_PRODUCTS : WOMEN_PRODUCTS;

  // yaha sirf selected colorId wale products nikal rahe hain
  const filteredProducts = baseProducts.filter(
    (p) => p.colorId === activeColor.id
  );

  // theoretically hamesha 10 honge, phir bhi safety
  const productsToShow =
    filteredProducts.length > 0 ? filteredProducts : baseProducts;

  // color name ko thumb ke upar dikhane ke liye percentage position
  const thumbPercent =
    COLORS.length === 1
      ? 0
      : (activeColorIndex / (COLORS.length - 1)) * 100;

  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 400,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // helper: slider ko first slide pe lao
  const resetSlider = () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Top row: title + tabs */}
        <div className={styles.topRow}>
          <h2 className={styles.title}>
            SLIDE INTO THE COLORS OF HOI
          </h2>

          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${
                activeGender === "men" ? styles.tabActive : ""
              }`}
              onClick={() => {
                setActiveGender("men");
                setActiveColorIndex(0); // default Black
                resetSlider(); // 👈 men pe click -> first slide
              }}
            >
              Men
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${
                activeGender === "women" ? styles.tabActive : ""
              }`}
              onClick={() => {
                setActiveGender("women");
                setActiveColorIndex(0); // default Black
                resetSlider(); // 👈 women pe click -> first slide
              }}
            >
              Women
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className={styles.sliderWrapper}>
          <Slider ref={sliderRef} {...settings}>
            {productsToShow.map((product) => (
              <div key={product.id} className={styles.cardOuter}>
                <div className={styles.card}>
                  <div className={styles.cardImageWrap}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.cardImage}
                    />
                  </div>
                </div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardName}>{product.name}</p>
                  <p className={styles.cardSubtitle}>
                    {product.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Color selector – line + moving label */}
        <div className={styles.colorSection}>
          <div className={styles.colorSliderWrapper}>
            {/* moving color name */}
            <div
              className={styles.colorNameBubble}
              style={{
                left: `${thumbPercent}%`,
                borderColor: activeColor.hex,
              }}
            >
              {activeColor.label}
            </div>

            <input
              type="range"
              min={0}
              max={COLORS.length - 1}
              step={1}
              value={activeColorIndex}
              onChange={(e) => {
                const newIndex = Number(e.target.value);
                setActiveColorIndex(newIndex);
                resetSlider(); // 👈 color change -> first slide
              }}
              className={styles.colorRange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default JockeyColorSlider;
