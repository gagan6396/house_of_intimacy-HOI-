// src/components/CategoryStrip.jsx
import React from 'react';
import styles from '../../assets/styles/CategoryStrip.module.css';
import braImg from '../../assets/images/2.png';
import pantiesImg from '../../assets/images/3.png';
import nightwearImg from '../../assets/images/4.png';
import activewearImg from '../../assets/images/5.png';
import swimwearImg from '../../assets/images/6.png';
import shapewearImg from '../../assets/images/7.png';
import layeringImg from '../../assets/images/8.png';
import accessoriesImg from '../../assets/images/10.png';
import saleImg from '../../assets/images/9.png';
import { Link } from 'react-router-dom';

const categories = [
  { label: 'Bra', image: braImg, slug: '/bras' },
  { label: 'Panties', image: pantiesImg, slug: '/panties' },
  { label: 'Nightwear', image: nightwearImg, slug: '/nightwear' },
  { label: 'Activewear', image: activewearImg, slug: '/activewear' },
  { label: 'Swimwear', image: swimwearImg, slug: '/swimwear' },
  { label: 'Shapewear', image: shapewearImg, slug: '/shapewear' },
  { label: 'Layering', image: layeringImg, slug: '/layering' },
  { label: 'Accessories', image: accessoriesImg, slug: '/accessories' },
  { label: 'Sale', image: saleImg, slug: '/sale' },
];

const CategoryStrip = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        {categories.map((cat) => (
          <Link key={cat.label} to={cat.slug} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={cat.image} alt={cat.label} className={styles.image} />
            </div>
            <span className={styles.label}>{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;
