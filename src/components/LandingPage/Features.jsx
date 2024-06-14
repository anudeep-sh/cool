import React, { useEffect, useState } from 'react';
import './Features.css';
import IMG1 from '../../assets/LandingPage/Features/1.svg';
import IMG2 from '../../assets/LandingPage/Features/2.svg';
import { useNavigate } from 'react-router-dom';
import RIGHT from '../../assets/LandingPage/Features/right.svg';
import RIGHT_HOVER from '../../assets/LandingPage/Features/right_hover.svg';
import ICON1 from '../../assets/LandingPage/Features/icon_1.svg';
import ICON2 from '../../assets/LandingPage/Features/icon_2.svg';
import ICON3 from '../../assets/LandingPage/Features/icon_3.svg';
import GetValidatedTokenData from '../../utils/helper';

export default function Features() {
  const navigate = useNavigate();
  const [rightIcon, setRightIcon] = useState(RIGHT);
  const list = [
    {
      id: 1,
      image: IMG1,
      link: '',
    },
    {
      id: 2,
      image: IMG2,
      link: '',
    },
  ];
  const list1 = [
    {
      id: 1,
      image: ICON1,
      heading: 'Select and Personalize a Theme 🎨',
      subheading: 'Easily create website from a wide array of themes, all within minutes!!',
    },
    {
      id: 2,
      image: ICON2,
      heading: 'Choose your required products 🛒',
      subheading:
        'Add products to your cart and highlight the available features by just a click!!',
    },
    {
      id: 3,
      image: ICON3,
      heading: 'Embark your journey with us! 🎯',
      subheading: 'Set up your platform and pursue your vision!!',
    },
  ];
  const handleButtonClick = () => {
    const tokenData = GetValidatedTokenData();
    if (tokenData?.isLoggedIn) {
      navigate('/organization');
    } else {
      navigate('/sign-in');
    }
  };
  return (
    <>
      <div className="featuresCon">
        <h1 className="featureHead">Features</h1>
        {list.map(({ id, image, link }) => {
          return (
            <div className="featureSubSec" key={id}>
              <img className="featureImg" src={image} alt={`Feature ${id}`} />
              <button
                className="featureBtn"
                onClick={handleButtonClick}
                onMouseEnter={() => setRightIcon(RIGHT_HOVER)}
                onMouseLeave={() => setRightIcon(RIGHT)}
              >
                Learn More
                <img src={rightIcon} alt="" />
              </button>
            </div>
          );
        })}
        <div className="featureCardCon">
          {list1.map(({ id, image, heading, subheading }) => {
            return (
              <div className="featureCard" key={id}>
                <img className="featureCardIcon" src={image} alt={`Feature ${id}`} />
                <p className="featureCardHeading">{heading}</p>
                <p className="featureCardSubHeading">{subheading}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
