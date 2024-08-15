import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { assets } from '../../assets/assets';
import './AboutUs.css';
import Footer from '../../components/Footer/Footer';

const AboutUs = () => {
  return (
    <>
    {/* Here I added some data on about us page */}
      <Navbar />
      <div className="about-us-container">
        <div className="banner-section">
          <img src={assets.aboutus_banner} alt="FreshBite Subs" className="about-image" />
          <h1 className="banner-title">Welcome to FreshBite Subs</h1>
        </div>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At FreshBite Subs, our mission is to provide fresh, delicious, and wholesome sandwiches that bring a smile to your face. We believe in using the highest quality ingredients to create subs that not only taste great but also nourish your body and soul.
          </p>
          <p>
            We are committed to sourcing local and organic produce whenever possible, ensuring that every bite is packed with flavor and nutrition. Our chefs craft each sandwich with care and creativity, combining classic flavors with innovative twists to delight your taste buds.
          </p>
          <p>
            At the heart of FreshBite Subs is a dedication to sustainability and ethical practices. We work closely with our suppliers to ensure that all ingredients are responsibly sourced, and we strive to minimize our environmental footprint through eco-friendly packaging and waste reduction initiatives.
          </p>
          <p>
            Whether you’re grabbing a quick lunch or catering a special event, we aim to provide an exceptional dining experience that exceeds your expectations. Our friendly staff is passionate about great food and outstanding service, always ready to welcome you with a warm smile and a fresh sub.
          </p>
          <p>
            Join us at FreshBite Subs and discover the difference that freshness, quality, and a commitment to excellence can make. Together, let’s celebrate the joy of good food and the positive impact it can have on our lives and our community.
          </p>
        </section>

        <section className="history-section">
          <h2>Our Story</h2>
          <p>
            FreshBite Subs was founded in 2022 with a passion for creating the best sandwiches in town. What started as a small family-owned business has grown into a beloved local eatery known for its commitment to freshness, flavor, and community. Our journey has been fueled by our love for great food and our dedication to providing outstanding service.
          </p>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <ul>
            <li>
              <strong>Quality:</strong>
              We source only the freshest and finest ingredients. Our commitment to quality means that every sandwich is made with care, using handpicked produce, premium meats, and artisanal breads. We believe that great taste starts with great ingredients, and we never compromise on this principle.
            </li>
            <li>
              <strong>Community:</strong>
              We are committed to supporting and giving back to our community. FreshBite Subs is proud to be an active member of the local community, participating in events, supporting local farmers and suppliers, and contributing to charitable causes. We believe in building strong relationships and making a positive impact where we live and work.
            </li>
            <li>
              <strong>Customer Satisfaction:</strong>
              Your happiness is our top priority. We strive to provide an exceptional dining experience for every customer, every time. Our friendly staff is dedicated to ensuring that your visit to FreshBite Subs is enjoyable, and we are always eager to hear your feedback to continually improve our service.
            </li>
            <li>
              <strong>Innovation:</strong>
              We continually strive to bring new and exciting flavors to our menu. Our culinary team is passionate about experimenting with fresh ingredients and bold combinations to create unique subs that surprise and delight. We believe that innovation keeps our menu vibrant and our customers excited to try new things.
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs
