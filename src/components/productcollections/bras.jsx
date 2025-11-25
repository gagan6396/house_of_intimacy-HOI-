// src/components/BrasListing/BrasListing.jsx
import React, { useState, useMemo, useEffect } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import styles from "../../assets/styles/productcollection/BraListing.module.css";

// 🔁 Replace these with your real image imports
import paddedImg from "../../assets/images/17.jpg";
import nonPaddedImg from "../../assets/images/19.jpg";
import wiredImg from "../../assets/images/5.jpg";
import nonWiredImg from "../../assets/images/17.jpg";
import tshirtImg from "../../assets/images/19.jpg";
import pushupImg from "../../assets/images/5.jpg";
import multiwayImg from "../../assets/images/17.jpg";
import sliponImg from "../../assets/images/19.jpg";
import braletteImg from "../../assets/images/5.jpg";
import fullFigureImg from "../../assets/images/17.jpg";
import minimizerImg from "../../assets/images/19.jpg";
import sportsImg from "../../assets/images/5.jpg";

// Product card images
import prod1Img from "../../assets/images/CSC_0015.jpg";
import prod2Img from "../../assets/images/IMG_4869.JPG";
import prod3Img from "../../assets/images/CSC_0015.jpg";
import prod4Img from "../../assets/images/IMG_4869.JPG";
import { useNavigate } from "react-router-dom";

// ----- TOP FILTER TYPES -----
const BRA_TYPES = [
  { id: "padded", label: "Padded Bra", image: paddedImg },
  { id: "nonPadded", label: "Non-Padded Bra", image: nonPaddedImg },
  { id: "wired", label: "Wired", image: wiredImg },
  { id: "nonWired", label: "Non-Wired", image: nonWiredImg },
  { id: "tshirt", label: "T-Shirt Bra", image: tshirtImg },
  { id: "pushup", label: "Push-Up Bra", image: pushupImg },
  { id: "multiway", label: "Multiway Bra", image: multiwayImg },
  { id: "slipon", label: "Slip-On Bra", image: sliponImg },
  { id: "bralette", label: "Bralette", image: braletteImg },
  { id: "fullFigure", label: "Full Figure Bra", image: fullFigureImg },
  { id: "minimizer", label: "Minimizer", image: minimizerImg },
  { id: "sports", label: "Sports Bra", image: sportsImg },
];

// ----- PRODUCT DATA -----
const ALL_PRODUCTS = [
  {
    id: 1,
    brand: "AMANTE",
    name: "Carefree Casuals Padded Non-Wired T-Shirt Bra - Shadow Floral Pr",
    mrp: 745,
    price: 745,
    discount: 0,
    image: prod1Img,
    types: ["padded", "nonWired", "tshirt"],
    colors: ["#f7d7e1", "#f2b8c6", "#fbe9e7"],
  },
  {
    id: 2,
    brand: "AMANTE",
    name: "Skins V-Neck Bra - Mellow Mauve",
    mrp: 1489,
    price: 1489,
    discount: 0,
    image: prod2Img,
    types: ["nonPadded", "nonWired"],
    colors: ["#c08497", "#f6d1e0"],
  },
  {
    id: 3,
    brand: "AMANTE",
    name: "Luxe Support Non-Padded Wired Bra - Black",
    mrp: 1539,
    price: 1539,
    discount: 0,
    image: prod3Img,
    types: ["nonPadded", "wired"],
    colors: ["#111827", "#4b5563"],
  },
  {
    id: 4,
    brand: "AMANTE",
    name: "Cool Contour Non Padded Wirefree Bra - Ditsy Floral Pr",
    mrp: 695,
    price: 278,
    discount: 60,
    image: prod4Img,
    types: ["nonPadded", "nonWired", "tshirt"],
    colors: ["#fde2e4", "#fbb1bd", "#ffccd5"],
  },
  {
    id: 5,
    brand: "AMANTE",
    name: "Everyday Lace Non-Wired Bra",
    mrp: 899,
    price: 899,
    discount: 0,
    image: prod1Img,
    types: ["nonWired", "bralette"],
    colors: ["#ffe4e6", "#f9a8d4"],
  },
  {
    id: 6,
    brand: "AMANTE",
    name: "SoftLift Padded Bra",
    mrp: 1299,
    price: 999,
    discount: 20,
    image: prod2Img,
    types: ["padded"],
    colors: ["#f5d0fe", "#e9d5ff"],
  },
  {
    id: 7,
    brand: "AMANTE",
    name: "Contour Wired T-Shirt Bra",
    mrp: 1499,
    price: 1499,
    discount: 0,
    image: prod3Img,
    types: ["wired", "tshirt"],
    colors: ["#fecdd3", "#fee2e2"],
  },
  {
    id: 8,
    brand: "AMANTE",
    name: "UltraSoft Lounge Slip-On Bra",
    mrp: 699,
    price: 699,
    discount: 0,
    image: prod4Img,
    types: ["slipon", "nonWired"],
    colors: ["#fbcfe8", "#f5d0fe"],
  },
  {
    id: 9,
    brand: "AMANTE",
    name: "Athleisure Sports Bra - FlexFit",
    mrp: 1799,
    price: 1299,
    discount: 28,
    image: prod1Img,
    types: ["sports"],
    colors: ["#bfdbfe", "#93c5fd"],
  },
  {
    id: 10,
    brand: "AMANTE",
    name: "FeatherSoft Minimizer Bra",
    mrp: 1699,
    price: 1350,
    discount: 21,
    image: prod2Img,
    types: ["minimizer"],
    colors: ["#fef2f2", "#fecaca"],
  },
  {
    id: 11,
    brand: "AMANTE",
    name: "MicroFiber Multiway Bra",
    mrp: 1299,
    price: 1299,
    discount: 0,
    image: prod3Img,
    types: ["multiway"],
    colors: ["#d1d5db", "#9ca3af"],
  },
  {
    id: 12,
    brand: "AMANTE",
    name: "Classic Lace Bralette",
    mrp: 899,
    price: 899,
    discount: 0,
    image: prod4Img,
    types: ["bralette"],
    colors: ["#fbcfe8"],
  },
  {
    id: 13,
    brand: "AMANTE",
    name: "NextGen Push-Up Bra",
    mrp: 1599,
    price: 1299,
    discount: 19,
    image: prod1Img,
    types: ["pushup", "padded"],
    colors: ["#fee2e2", "#fecaca"],
  },
  {
    id: 14,
    brand: "AMANTE",
    name: "ComfortFull Full Figure Bra",
    mrp: 1899,
    price: 1599,
    discount: 15,
    image: prod2Img,
    types: ["fullFigure"],
    colors: ["#f3e8ff"],
  },
  {
    id: 15,
    brand: "AMANTE",
    name: "DailyWear Non-Padded Bra",
    mrp: 699,
    price: 599,
    discount: 14,
    image: prod3Img,
    types: ["nonPadded"],
    colors: ["#e5e7eb"],
  },
  {
    id: 16,
    brand: "AMANTE",
    name: "Premium Cotton Non-Wired Bra",
    mrp: 849,
    price: 799,
    discount: 6,
    image: prod4Img,
    types: ["nonWired"],
    colors: ["#fef3c7"],
  },
];

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "priceLow", label: "Price: Low to High" },
  { id: "priceHigh", label: "Price: High to Low" },
];

const PRODUCTS_PER_PAGE = 12; // 12 per page

const BrasListing = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // ⭐ Scroll to top whenever page changes (Prev, Next, number)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ----- FILTER + SORT -----
  const filteredProducts = useMemo(() => {
    let products =
      selectedType === "all"
        ? [...ALL_PRODUCTS]
        : ALL_PRODUCTS.filter((p) => p.types.includes(selectedType));

    if (sortBy === "priceLow") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      products.sort((a, b) => b.price - a.price);
    }
    return products;
  }, [selectedType, sortBy]);

  // ----- PAGINATION -----
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // filter/sort → reset to page 1
  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.page}>
      {/* -------- BREADCRUMB -------- */}
      <div className={`container ${styles.breadcrumb}`}>
        <span
          className={styles.breadcrumbLink}
          onClick={() => navigate("/")}
        >
          Home
        </span>

        <span className={styles.breadcrumbSeparator}>&gt;</span>

        <span>Bras</span>
      </div>

      {/* -------- TOP TYPE FILTER (IMAGE CHIPS) -------- */}
      <div className={`container-fluid ${styles.typeFilterWrapper}`}>
        <button
          type="button"
          className={`${styles.typeChip} ${
            selectedType === "all" ? styles.typeChipActive : ""
          }`}
          onClick={() => handleTypeChange("all")}
        >
          <div className={styles.typeChipImgWrapper}>
            <div className={styles.typeChipAllCircle}>All</div>
          </div>
          <span className={styles.typeChipLabel}>All Bras</span>
        </button>

        {BRA_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            className={`${styles.typeChip} ${
              selectedType === type.id ? styles.typeChipActive : ""
            }`}
            onClick={() => handleTypeChange(type.id)}
          >
            <div className={styles.typeChipImgWrapper}>
              <img
                src={type.image}
                alt={type.label}
                className={styles.typeChipImg}
              />
            </div>
            <span className={styles.typeChipLabel}>{type.label}</span>
          </button>
        ))}
      </div>

      {/* -------- FILTER & SORT ROW -------- */}
      <div className={`container-fluid ${styles.filterSortRow}`}>
        <div className={styles.filterLeft}>
          <span className={styles.filterLabel}>FILTER:</span>
          <button className={styles.filterPill}>CATEGORY</button>
          <button className={styles.filterPill}>COLOR</button>
          <button className={styles.filterPill}>SIZE</button>
          <button className={styles.filterPill}>BRAND</button>
          <button className={styles.filterPill}>PREFERENCE</button>
          <button className={styles.filterPill}>STYLES</button>
          <button className={styles.filterPill}>COVERAGE</button>
          <button className={styles.filterPill}>OCCASION</button>
          <button className={styles.filterPill}>FABRIC</button>
          <button className={styles.filterPill}>PACK OF</button>
          <button className={styles.filterPill}>PATTERN</button>
          <button className={styles.filterPill}>CLOSURE TYPE</button>
          <button className={styles.filterPill}>STRAP</button>
          <button className={styles.filterPill}>PRICE</button>
          <button className={styles.filterPill}>AVAILABILITY</button>
          <button className={styles.filterPill}>DISCOUNT</button>
        </div>

        <div className={styles.sortRight}>
          <span className={styles.sortLabel}>SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.sortSelect}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* -------- PRODUCTS GRID -------- */}
      <div className={styles.productsGrid}>
        {paginatedProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            {product.discount > 0 && (
              <div className={styles.discountTag}>{product.discount}% off</div>
            )}

            <button className={styles.wishlistBtn} type="button">
              <FiHeart />
            </button>

            <div className={styles.cardImageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.cardImage}
              />
            </div>

            <div className={styles.cardBody}>
              <div className={styles.brand}>{product.brand}</div>
              <div className={styles.name}>{product.name}</div>

              <div className={styles.priceRow}>
                <span className={styles.price}>MRP ₹ {product.price}</span>
                {product.discount > 0 && (
                  <span className={styles.mrpStriked}>
                    ₹ {product.mrp.toFixed(0)}
                  </span>
                )}
              </div>

              {product.colors?.length > 0 && (
                <div className={styles.colorsRow}>
                  {product.colors.map((c, index) => (
                    <span
                      key={index}
                      className={styles.colorDot}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              )}

              <button type="button" className={styles.addToBagBtn}>
                <FiShoppingBag className={styles.addToBagIcon} />
              </button>
            </div>
          </div>
        ))}

        {paginatedProducts.length === 0 && (
          <div className={styles.noResults}>No products found.</div>
        )}
      </div>

      {/* -------- PAGINATION -------- */}
      {totalPages > 1 && (
        <div className={styles.paginationWrapper}>
          <button
            type="button"
            className={`${styles.pageBtn} ${styles.pagePrevNext}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                type="button"
                className={`${styles.pageBtn} ${
                  currentPage === page ? styles.pageBtnActive : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            className={`${styles.pageBtn} ${styles.pagePrevNext}`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BrasListing;
