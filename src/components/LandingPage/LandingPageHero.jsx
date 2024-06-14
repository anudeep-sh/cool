import React, { useEffect, useState } from 'react';
import './LandingPageHero.css';
import LEFT from '../../assets/LandingPage/Hero/hero_1.svg';
import RIGHT from '../../assets/LandingPage/Hero/hero_2.svg';
import LEFT_MOB from '../../assets/LandingPage/Hero/hero_1_mobile.svg';
import RIGHT_MOB from '../../assets/LandingPage/Hero/hero_2_mobile.svg';
import IMG01 from '../../assets/LandingPage/Hero/long-arrow-alt-right.svg';
import IMG02 from '../../assets/LandingPage/Hero/browse_products_icon.svg';
import { useNavigate } from 'react-router-dom';

export default function LandingPageHero() {
  const [startIcon, setStartIcon] = useState(IMG01);
  const [browseIcon, setBrowseIcon] = useState(IMG02);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      const mobileBreakpoint = 1200;

      if (window.innerWidth <= mobileBreakpoint) {
        document.querySelector('.heroLeft img').src = LEFT_MOB;
        document.querySelector('.heroRight img').src = RIGHT_MOB;
      } else {
        document.querySelector('.heroLeft img').src = LEFT;
        document.querySelector('.heroRight img').src = RIGHT;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isLoggedIn = !!localStorage.getItem('Token');
  const handleButtonBrowse = () => {
    navigate('/our-products');
  };
  const handleButtonClick = () => {
    if (isLoggedIn) navigate('/organization');
    else navigate('/sign-in');
  };
  return (
    <div>
      <div className="heroCon">
        <div className="heroLeft">
          <img className="heroimgleft" src={LEFT} alt="" />
          <p className="tenPlus">10+</p>
        </div>
        <div className="herMid">
          <div className="heroMid1">
            Manage <span className="herBlack"> your </span>organization{' '}
            <span className="herBlack"> effortlessly packed with </span>
            incredible features<span className="herBlack">!</span>
          </div>
          <div className="heroMid2">
            Explore our premier all in one hub designed to empower individuals and organizations on
            their journey
          </div>
          <div className="heroMid3">
            <button className="startBtn" onClick={handleButtonClick}>
              Let’s Start
              <img className="btnIconHEro" src={startIcon} alt="" />
            </button>
            <button className="browseBtn" onClick={handleButtonBrowse}>
              Browse Products
              <img className="btnIconHEro" src={browseIcon} alt="" />
            </button>
          </div>
        </div>
        <div className="heroRight">
          <img className="heroimgright" src={RIGHT} alt="" />
          <p className="oneK">1K+</p>
        </div>
      </div>
    </div>
  );
}
