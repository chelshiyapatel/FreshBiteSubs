import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import './ContactUs.css';
import Footer from '../../components/Footer/Footer';

const ContactUs = () => {
  return (
    <>
      {/* Here I simply added the design for the contact us page */}
      <Navbar />
      <div className="contact-us-container">
        <div className="map-section">
          <iframe
            title="FreshBite Subs Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.119286998254!2d144.95565151531556!3d-37.817327979751654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577f8d6ed4917b7!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1627471579658!5m2!1sen!2sau"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="form-section">
          <h2>Contact Us</h2>
          <p>If you have any questions, feel free to reach out to us.</p>
          <form>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Message:
              <textarea name="message" required></textarea>
            </label>
            <button type="submit">Send</button>
          </form>
          <div className="contact-details">
            <p>Email: info@freshbitesubs.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ContactUs
