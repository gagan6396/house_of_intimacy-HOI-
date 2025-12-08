import React from 'react';
import Style from '../../assets/styles/InstaReels.module.css';
import { Link } from 'react-router-dom'; 

const BlogCard = ({ image, heading, link }) => {
  return (
    <div className={Style.blogcard}>
      <div className={Style.blogcardimage}>
        <img src={image} alt={heading} />
      </div>
      <div className={Style.blogcardcontent}>
        <h3 className={Style.blogcardheading}>{heading}</h3>
        <Link to={link} className={Style.blogcardbutton}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default function BlogCards() {
  const blogs = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      heading: 'How to Choose Innerwear Based on Your Daily Lifestyle',
      link: '/BlogDetails'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80',
      heading: 'How to Care for Your Intimate Apparel',
      link: '/BlogDetails'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      heading: 'Latest Fashion Trends in Nightwear',
      link: '/BlogDetails'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      heading: 'Comfort Meets Style: Best Everyday Wear',
      link: '/BlogDetails'
    }
  ];

  return (
    <div className={Style.blogcardscontainer}>
      <div className="row">
        {blogs.map(blog => (
          <div className="col-md-3 col-6 col-lg-3" key={blog.id}>
            <BlogCard
              image={blog.image}
              heading={blog.heading}
              link={blog.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

