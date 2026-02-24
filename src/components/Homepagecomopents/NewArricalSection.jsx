import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import styles from '../../assets/styles/LingerieSection.module.css';

// contexts
import { WishlistContext } from '../../contexts/WishlistContext';
import { SidebarContext } from '../../contexts/SidebarContext';

// assets
import heroVideoPoster from '../../assets/videos/IMG_3698.MP4';
import heroVideo from '../../assets/videos/IMG_3698.MP4';
import prodFallback from '../../assets/images/17.jpg';

// config
const BRAND_NAME = 'Vamika';
const baseUrl = process.env.REACT_APP_APIURL || 'http://localhost:8000/v1';
const apiRoot = baseUrl.replace(/\/v1$/, '');
const PRODUCTS_ENDPOINT = `${baseUrl}/products/brand/${encodeURIComponent(BRAND_NAME)}`;

const COLOR_MAP = {
  Black: '#000000', Purple: '#800080', White: '#ffffff', Red: '#ef4444',
  Blue: '#3b82f6', Green: '#22c55e', Nude: '#F5D0C5', Pink: '#ec4899', Yellow: '#facc15',
};

const decodeColor = (value) => {
  if (!value) return '#e5e5e5';
  const str = String(value).trim();
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str)) return str;
  const lower = str.toLowerCase();
  const key = Object.keys(COLOR_MAP).find((k) => k.toLowerCase() === lower);
  return key ? COLOR_MAP[key] : str || '#e5e5e5';
};

const getImageUrl = (path) => {
  if (!path) return prodFallback;
  if (path.startsWith('http')) return path;
  return `${apiRoot}${path}`;
};

const getUnitPrice = (item) =>
  item?.price?.sellingPrice || item?.price?.sale || item?.price?.finalPrice || item?.price?.mrp || 0;

const getDiscountPercent = (mrp, sellingPrice) => {
  if (!mrp || !sellingPrice || mrp <= sellingPrice) return 0;
  return Math.round(((mrp - sellingPrice) / mrp) * 100);
};

const NextArrow = ({ onClick }) => (
  <button type="button" className={styles.nextArrow} onClick={onClick}>&gt;</button>
);
const PrevArrow = ({ onClick }) => (
  <button type="button" className={styles.prevArrow} onClick={onClick}>&lt;</button>
);

const getBaseCode = (code) => {
  if (!code) return null;
  const parts = code.split('-');
  return parts.length >= 2 ? `${parts[0]}-${parts[1]}` : code;
};

// ─── useWindowWidth hook ────────────────────────────────────────────
const useWindowWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
};

// ─── get slidesToShow based on actual window width ──────────────────
const getSlidesToShow = (width) => {
  if (width <= 480) return 1;
  if (width <= 768) return 1;
  if (width <= 992) return 2;
  if (width <= 1280) return 3;
  return 4;
};

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  const sidebar = useContext(SidebarContext);
  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);
  const windowWidth = useWindowWidth();
  const slidesToShow = getSlidesToShow(windowWidth);

  // ── Slider settings ─────────────────────────────────────────────
  const settings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow,
  slidesToScroll: 1,
  swipeToSlide: true,
  lazyLoad: "ondemand", // ✅ Added
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

  const getColorVariants = (currentProduct, allProductsList) => {
    if (!currentProduct?.productCode) return [];
    const baseCode = getBaseCode(currentProduct.productCode);
    const sameBase = allProductsList.filter(
      (p) => p.productCode && getBaseCode(p.productCode) === baseCode
    );
    const colorMap = new Map();
    sameBase.forEach((product) => {
      (product.colors || []).forEach((color) => {
        if (color && !colorMap.has(color)) {
          colorMap.set(color, {
            color,
            productId: product._id,
            isCurrentProduct: String(product._id) === String(currentProduct._id),
          });
        }
      });
    });
    return Array.from(colorMap.values());
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(PRODUCTS_ENDPOINT);
        const backendProducts = res.data?.data || [];
        setAllProducts(backendProducts);

        const mapped = backendProducts.map((prod) => {
          const mrp = prod.price?.mrp || 0;
          const salePrice = prod.price?.sale || mrp;
          let totalStock = 0;
          if (typeof prod.totalStock === 'number') totalStock = prod.totalStock;
          else if (typeof prod.stock === 'number') totalStock = prod.stock;
          else if (Array.isArray(prod.sizes))
            totalStock = prod.sizes.reduce((s, x) => s + (x.stock || 0), 0);

          return {
            _id: prod._id, id: prod._id,
            brand: prod.brand || BRAND_NAME,
            name: prod.name,
            description: prod.description || '',
            category: prod.category, subcategory: prod.subcategory,
            productCode: prod.productCode || null,
            price: { mrp, sale: salePrice, sellingPrice: salePrice, finalPrice: salePrice },
            mrp,
            image: getImageUrl(prod.mainImage || (prod.galleryImages && prod.galleryImages[0])),
            mainImage: prod.mainImage || (prod.galleryImages && prod.galleryImages[0]),
            colors: Array.isArray(prod.colors) ? prod.colors : [],
            sizes: prod.sizes || [],
            stock: totalStock,
            gender: prod.gender || prod.genderType || 'Unisex',
          };
        });
        setProducts(mapped);
      } catch (err) {
        console.error(err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleColorVariantClick = (e, variant) => {
    e.stopPropagation();
    navigate(`/product/${variant.productId}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{BRAND_NAME}</h2>

        <div className={styles.contentRow}>
          {/* LEFT */}
          <div className={styles.leftPanel}>
            <div className={styles.heroCard}>
              <video className={styles.heroVideo} autoPlay muted loop playsInline poster={heroVideoPoster}>
                <source src={heroVideo} type="video/mp4" />
              </video>
              <div className={styles.heroOverlay} />
              <button className={styles.heroBtn} onClick={() => navigate('/products')}>
                Shop Now
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.sliderWrapper}>
            {loading && <p className={styles.infoText}>Loading…</p>}
            {error && <p className={styles.errorText}>{error}</p>}

            {!loading && !error && (
              <Slider {...settings}>
                {products.map((item) => {
                  const unitPrice = getUnitPrice(item);
                  const discount = getDiscountPercent(item.mrp, unitPrice);
                  const isInWishlist = wishlistItems.includes(item.id);
                  const colorVariants = getColorVariants(item, allProducts);

                  return (
                    <div key={item.id} className={styles.slideOuter}>
                      <div
                        className={styles.productCard}
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        <button
                          className={`${styles.wishBtn} ${isInWishlist ? styles.wishBtnActive : ''}`}
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
                        >
                          {isInWishlist ? <FaHeart /> : <FiHeart />}
                        </button>

                        <div className={styles.productImageWrap}>
                          <img src={item.image} alt={item.name} className={styles.productImage} loading="lazy" />
                        </div>

                        <div className={styles.productBody}>
                          <div className={styles.brand}>{item.brand}</div>
                          <div className={styles.productName}>{item.name}</div>

                          <div className={styles.priceRow}>
                            <span className={styles.currentPrice}>₹ {unitPrice}</span>
                            {item.mrp > unitPrice && (
                              <span className={styles.originalPrice}>₹ {item.mrp}</span>
                            )}
                            {discount > 0 && (
                              <span className={styles.discountTag}>{discount}% OFF</span>
                            )}
                          </div>

                          <div className={styles.metaRow}>
                            <span className={`${styles.stockBadge} ${item.stock > 0 ? styles.inStock : styles.outOfStock}`}>
                              {item.stock > 0 ? `Stock: ${item.stock}` : 'Out of stock'}
                            </span>
                            <span className={styles.genderTag}>{item.gender}</span>
                          </div>

                          <div className={styles.bottomRow}>
                            <div className={styles.colorRow}>
                              {colorVariants.length > 0
                                ? colorVariants.map((variant, i) => (
                                    <span
                                      key={i}
                                      className={`${styles.colorDot} ${variant.isCurrentProduct ? styles.colorDotCurrentProduct : styles.colorDotOtherProduct}`}
                                      style={{ backgroundColor: decodeColor(variant.color) }}
                                      title={variant.color}
                                      onClick={(e) => handleColorVariantClick(e, variant)}
                                    />
                                  ))
                                : item.colors.slice(0, 3).map((c, i) => (
                                    <span
                                      key={i}
                                      className={styles.colorDot}
                                      style={{ backgroundColor: decodeColor(c) }}
                                      title={c}
                                    />
                                  ))}
                            </div>
                            <button
                              className={styles.cartBtn}
                              onClick={(e) => { e.stopPropagation(); sidebar.openQuickAdd(item); }}
                            >
                              <FiShoppingBag />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;