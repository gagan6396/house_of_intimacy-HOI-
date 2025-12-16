import React from "react";
import Slider from "react-slick";
import img5 from "../../assets/images/5.jpg";
import img17 from "../../assets/images/17.jpg";
import img19 from "../../assets/images/19.jpg";
import { Link } from "react-router-dom";

const sampleData = {
  New: [
    { id: 1, brand: "AquaFit", title: "Island Escape Bikini",priceOld: "$299.00", price: "$189.00", img: img5 },
    { id: 2, brand: "SwimStyle", title: "Seaside Sensation Monokini",priceOld: "$299.00", price: "$119.00", img: img5 },
    { id: 3, brand: "SwimStyle", title: "Seaside Sensation Monokini", priceOld: "$299.00", price: "$119.00", img: img17 },
    { id: 4, brand: "WaveWear", title: "Sand Dune One-piece Tankini", priceOld: "$299.00", price: "$112.00", img: img19 },
    { id: 5, brand: "SwimStyle", title: "Wave Rider Rash Guard Bikini", price: "$79.00", img: img5 },
    { id: 6, brand: "SwimStyle", title: "Tropicana Monokini", priceOld: "$299.00", price: "$89.00", img: img17 },
  ],
  Trendy: [
    { id: 7, brand: "WaveWear", title: "Sand Dune One-piece Tankini", priceOld: "$299.00", price: "$112.00", img: img19 },
    { id: 8, brand: "SwimStyle", title: "Wave Rider Rash Guard Bikini", priceOld: "$299.00", price: "$79.00", img: img5 },
    { id: 9, brand: "SwimStyle", title: "Tropicana Monokini", priceOld: "$299.00", price: "$89.00", img: img17 },
    { id: 10, brand: "Coastal Clothing", title: "Sunkissed Sands", priceOld: "$299.00", price: "$127.00", priceOld: "$160.00", img: img19 },
    { id: 11, brand: "Coastal Clothing", title: "Surfside Sunset Monokini", priceOld: "$299.00", price: "$229.00", img: img5 },
  ],
  Sale: [
    { id: 12, brand: "SeaSplash", title: "Tidal Temptation Bikini", priceOld: "$149.00", price: "$112.00", img: img19 },
    { id: 13, brand: "AquaFit", title: "Island Escape Bikini", priceOld: "$299.00", price: "$189.00", img: img19 },
    { id: 14, brand: "SwimStyle", title: "Seaside Sensation Monokini", priceOld: "$299.00", price: "$119.00", img: img5 },
    { id: 15, brand: "SwimStyle", title: "Seaside Sensation Monokini", priceOld: "$299.00", price: "$119.00", img: img17 },
    { id: 16, brand: "WaveWear", title: "Sand Dune One-piece Tankini", priceOld: "$299.00", price: "$112.00", img: img19 },
    { id: 17, brand: "SwimStyle", title: "Wave Rider Rash Guard Bikini", priceOld: "$299.00", price: "$79.00", img: img5 },
  ],
};

export default function ProductSection() {
  const sections = [
    { name: "New", align: "left" },
    { name: "Trendy", align: "right" },
    { name: "Sale", align: "left" },
  ];

  const sliderSettings = {
    infinite: true,
    speed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1536,
        settings: { slidesToShow: 4 }
      },
       {
        breakpoint: 991,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      },
    ],
  };

  return (
    <>
      <style>
        {`
        .product-section {
          background: linear-gradient(135deg, #fff5f7 0%, #ffe4ec 50%, #ffd4e5 100%);
          padding: 80px 40px;
          overflow: hidden;
        }
        .section-row {
          display: flex;
          align-items: center;
          margin-bottom: 70px;
        }
        .align-left { flex-direction: row; }
        .align-right { flex-direction: row-reverse; }

        .title-wrapper {
          min-width: 250px;
          padding: 0 30px;
        }

        .column-title {
          font-family: 'Playfair Display', serif;
          font-size: 60px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .view-all-link {
          color: #333;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          transition: 0.3s;
        }
        .view-all-link:hover {
          color: #e91e63;
        }

        .product-card {
          margin: 10px;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          transition: 0.3s;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .product-image {
          width: 100%;
          height: 350px;
          overflow: hidden;
          position: relative;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s;
        }
        .product-card:hover .product-image img {
          transform: scale(1.08);
        }

        .sale-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #e91e63;
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .product-info {
          padding: 20px;
        }

        .product-brand {
          font-size: 13px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .product-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .price-old {
          font-size: 15px;
          color: #999;
          text-decoration: line-through;
        }

        .price-current {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }

        .discount-percent {
          font-size: 13px;
          color: #e91e63;
          font-weight: 600;
          background: #ffe4ec;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .slick-slide > div {
          padding: 0 5px;
        }
// **********RESPONSIVE************

@media (max-width: 1055.98px) {
.column-title {
font-size: 36px;
  }
 .product-image {
          height: 350px;
          }
  
}
 /* BELOW 991px — 2 cards clean layout */
@media (max-width: 991.98px) {
  .section-row {
    flex-direction: column !important;
    align-items: flex-start;
    gap: 20px;
  }

  .title-wrapper {
    min-width: 100%;
    padding: 0;
  }

  .product-card {
    width: 100% !important;
    margin: auto;
  }

  .product-image {
    height: 300px !important;
  }
}

/* BELOW 768px — show 1 full card */
@media (max-width: 767.98px) {
  .product-card {
    width: 90% !important;
  }

  .product-image {
    height: 260px !important;
  }

  .column-title {
    font-size: 32px;
  }
}

/* BELOW 575px — mobile perfect layout */
@media (max-width: 575.98px) {
  .product-card {
    width: 100% !important;
    margin: auto;
  }

  .product-image {
    height: 240px !important;
  }

  .product-title {
    font-size: 16px;
  }

  .price-current {
    font-size: 18px;
  }
}

/* BELOW 400px — very small screens */
@media (max-width: 400px) {
  .product-image {
    height: 200px !important;
  }

  .column-title {
    font-size: 28px;
  }
}
  @media (max-width: 931.98px) {
  
}
@media(max-width: 820.98px){
   
}
@media(max-width: 799.98px){
  
}
@media(max-width: 767.98px){
     
}
@media(max-width: 799.98px){
}
@media(max-width: 575.98px){
}
@media(max-width: 538.98px){
  
}
@media(max-width: 474.98px){
}
@media(max-width: 412.98px){
   
}
@media(max-width: 390.98px){
}
@media(max-width: 375.98px){
}
@media(max-width: 360.98px){
  
}
      `}
      </style>

      <section className="product-section container-fluid">
        {sections.map((section) => (
          <div key={section.name} className={`section-row align-${section.align}`}>
            <div className="title-wrapper">
              <h3 className="column-title">{section.name}</h3>
              <a href="#" className="view-all-link">View All →</a>
            </div>

            <div style={{ width: "100%", paddingLeft: 20 }}>
              <Slider {...sliderSettings}>
                {sampleData[section.name].map((item) => {
                  const discount =
                    item.priceOld &&
                    Math.round(
                      ((parseFloat(item.priceOld.replace("$", "")) -
                        parseFloat(item.price.replace("$", ""))) /
                        parseFloat(item.priceOld.replace("$", ""))) *
                        100
                    );

                  return (
                    <div key={item.id}>
                      <article className="product-card">
                        <div className="product-image">
                          <img src={item.img} alt={item.title} />
                          {section.name === "Sale" && (
                            <div className="sale-badge">Sale</div>
                          )}
                        </div>

                        <div className="product-info">
                          <div className="product-brand">{item.brand}</div>
                          <div className="product-title">{item.title}</div>

                          <div className="product-price">
                            {item.priceOld && <span className="price-old">{item.priceOld}</span>}
                            <span className="price-current">{item.price}</span>
                            {discount && <span className="discount-percent">-{discount}%</span>}
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}