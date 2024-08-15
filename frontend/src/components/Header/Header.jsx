import React, { useState, useEffect } from 'react';
import './Header.css';
import { assets } from '../../assets/assets';

const Header = () => {
    // Here I added the list of images that I want to display on Image Slider
    const images = [
        assets.banner1,  // Reference: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fphoto%2F23181981-sandwich-with-ham-cheese-tomato-and-lettuce-on-a-dark-background-ai-generative-image&psig=AOvVaw0j3cQhQZsfmTR6E64ORhgW&ust=1716755833306000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOibopDUqYYDFQAAAAAdAAAAABAE
        assets.banner2,  // Reference: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fphoto%2F23183589-sandwich-with-ham-cheese-tomato-and-lettuce-on-black-background-ai-generative-image&psig=AOvVaw0j3cQhQZsfmTR6E64ORhgW&ust=1716755833306000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOibopDUqYYDFQAAAAAdAAAAABAZ
        assets.banner3,  // Reference: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fphoto%2F23185368-sandwich-with-ham-cheese-tomato-and-lettuce-on-black-background-ai-generative-image&psig=AOvVaw0j3cQhQZsfmTR6E64ORhgW&ust=1716755833306000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOibopDUqYYDFQAAAAAdAAAAABAp
        assets.banner4  // Reference: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fphoto%2F23185368-sandwich-with-ham-cheese-tomato-and-lettuce-on-black-background-ai-generative-image&psig=AOvVaw0j3cQhQZsfmTR6E64ORhgW&ust=1716755833306000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOibopDUqYYDFQAAAAAdAAAAABAp
    ];

    // Here I set the state to track the current image index
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // This is the function to change the background image
        const changeImage = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        // Here I set the interval for changing the images
        const intervalId = setInterval(changeImage, 5000);

        // Here I cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className='header'>
            <div 
                className="banner-image" 
                style={{ backgroundImage: `url(${images[currentIndex]})` }} // This is to set the image based on current index
            >
                {/* Below I added the basic styling for the header section  */}
                <div className="banner-text">
                    <h1>Welcome to FreshBite Subs!</h1>
                    <b>
                        <p className="subheading">Delicious Subs just a click away.</p>
                        <p className="subheading">Browse our menu to find your favorite.</p>
                    </b>
                </div>
            </div>
        </div>
    );
};

export default Header;

// Reference: https://conestoga.desire2learn.com/d2l/le/content/761833/viewContent/15904284/View
// For cretaing the image slider I first refere week 9 (Javascript Programming), 35 number slide and make image slider in ReactJS
