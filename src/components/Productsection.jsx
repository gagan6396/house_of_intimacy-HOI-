import React from "react";
import styles from "../assets/styles/Productsection.module.css";
import img5 from "../assets/images/5.jpg";
import img17 from "../assets/images/17.jpg";
import img19 from "../assets/images/19.jpg";
const sampleData = {
  New: [
    { id: 1, brand: "AquaFit", title: "Island Escape Bikini", price: "$189.00", img:img5 },
    { id: 2, brand: "SwimStyle", title: "Seaside Sensation One-piece Monokini", price: "$119.00", img: img17 },
    { id: 3, brand: "SwimStyle", title: "Seaside Sensation One-piece Monokini", price: "$119.00", img: img19 },
  ],
  Trendy: [
    { id: 4, brand: "WaveWear", title: "Sand Dune One-piece Tankini", price: "$112.00", img:img5 },
    { id: 5, brand: "SwimStyle", title: "Wave Rider Rash Guard Bikini", price: "$79.00", img: img17 },
    { id: 6, brand: "SwimStyle", title: "Tropicana Monokini", price: "$89.00", img: img19 },
  ],
  Sale: [
    { id: 7, brand: "Coastal Clothing", title: "Sunkissed Sands One-Piece Swimsuit", priceOld: "$160.00", price: "$127.00", img:img5 },
    { id: 8, brand: "Coastal Clothing", title: "Surfside Sunset Monokini", priceOld: "$299.00", price: "$229.00", img: img17 },
    { id: 9, brand: "SeaSplash", title: "Tidal Temptation Bikini", priceOld: "$149.00", price: "$112.00", img:img5 },
  ],
};

export default function ProductSection() {
  const columns = ["New", "Trendy", "Sale"];

  return (
    <section className={`${styles["product-section"]} py-5`}>
      <div className="container">
        <div className="row">
          {columns.map((col) => (
            <div key={col} className="col-12 col-md-4">
              <h3 className={`${styles["column-title"]} text-center text-md-start mb-4`}>
                {col}
              </h3>

              <div className="list-group">
                {sampleData[col].map((item) => (
                  <article
                    key={item.id}
                    className={`list-group-item border-0 px-0 py-3 d-flex align-items-start ${styles["product-item"]}`}
                  >
                    <div className={`${styles.thumb} me-3 flex-shrink-0`}>
                      <img
                        src={item.img}
                        alt={item.title}
                        className="img-fluid rounded shadow-sm"
                      />
                    </div>

                    <div className={styles.meta}>
                      <div className={`${styles.brand} text-muted small`}>
                        {item.brand}
                      </div>

                      <div className={`${styles.title} text-secondary`}>
                        {item.title}
                      </div>

                      <div className={styles.price}>
                        {item.priceOld && (
                          <span className={`${styles.old} me-2`}>
                            {item.priceOld}
                          </span>
                        )}
                        <span className={`${styles.now} fw-bold`}>
                          {item.price || item.price}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className={`${styles["view-all"]} text-center text-md-start mt-3`}>
                <a href="#" className="text-decoration-underline small">
                  VIEW ALL
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
