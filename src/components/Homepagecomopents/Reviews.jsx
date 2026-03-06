import React from "react";
import Slider from "react-slick";
import styles from "../../assets/styles/review.module.css";

const reviews = [
{
text:"Vamika – House of Intimacy is one of the best innerwear stores I've visited! They have a premium collection from brands like Jockey, Amanté, Enamor, and Bodycare, and the quality is truly impressive.",
author:"ARUN NEGI"
},
{
text:"Clean shop, polite staff and great brands. I went to buy for my sister and they guided me very well.",
author:"POOJA TARIYAL"
},
{
text:"Loved the variety here! From everyday innerwear to premium collection, everything is neatly arranged.",
author:"JYOTI PANDEY"
},
{
text:"House of Intimacy is now my go-to lingerie store. Quality is genuine and prices are fair.",
author:"ASTHA"
},
{
text:"Best innerwear store for women! Stylish designs and premium ranges too.",
author:"PRACHI PANT"
}
];

const StarRating = () => {
return (
<div className={styles.stars}>
{[1,2,3,4,5].map((i)=>(
<span key={i}>★</span>
))}
</div>
)
}

const ReviewCard = ({text,author}) => {
return(
<div className={styles.reviewCard}>

<div className={styles.quote}>“</div>

<StarRating/>

<p className={styles.reviewText}>{text}</p>

<div className={styles.author}>
<span className={styles.line}></span>
{author}
</div>

</div>
)
}

const Reviewssection = () => {

const settings = {
dots:false,
infinite:true,
speed:600,
slidesToShow:4,
slidesToScroll:1,
autoplay:true,
autoplaySpeed:3500,
arrows:false,
responsive:[
{
breakpoint:1200,
settings:{
slidesToShow:3
}
},
{
breakpoint:992,
settings:{
slidesToShow:2
}
},
{
breakpoint:768,
settings:{
slidesToShow:1
}
}
]
}

return (

<section className={styles.section}>

<div className={styles.container}>

<h2 className={styles.title}>Words of Love</h2>

<Slider {...settings}>

{reviews.map((review,index)=>(
<div key={index} className={styles.slide}>
<ReviewCard {...review}/>
</div>
))}

</Slider>

</div>

</section>

)

}

export default Reviewssection