import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import ABOUT from '../../assets/LandingPage/About us/optigrit_video.svg';
import ABOUTPHN from '../../assets/LandingPage/About us/optigrit_video_phone.svg';
import BTN from '../../assets/LandingPage/About us/get_started.svg';
import IMG1 from '../../assets/LandingPage/About us/card_1.svg';
import IMG2 from '../../assets/LandingPage/About us/card_2.svg';
import IMG3 from '../../assets/LandingPage/About us/card_3.svg';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Header/Footer';
import GetValidatedTokenData from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

export default function AboutUs() {
  useDocumentTitle('About Us')
  const navigate = useNavigate();
  const handleButtonClick = () => {
    const tokenData = GetValidatedTokenData();
    if (tokenData.isLoggedIn) {
      navigate('/organization');
    } else {
      navigate('/sign-in');
    }
  };
  const list = [
    {
      id: 1,
      img: IMG1,
      head: 'Our Mission',
      text: 'Empower individuals and organizations with cutting-edge  tools and resources to foster  innovation and growth.',
    },
    {
      id: 2,
      img: IMG2,
      head: 'Our Vision',
      text: "Create a world where every idea, big or small ideas, can transform  into a reality with Optigrit's  support.",
    },
    {
      id: 3,
      img: IMG3,
      head: 'Our Values',
      text: 'Fostering innovation, integrity, and collaboration, we empower  individuals and organizations to achieve their potential and make a positive global impact.',
    },
  ];
  return (
    <>
      <Navbar />
      <div className="aboutUs">
        <div>
          <div className="aboutHeadingCon">
            <p>Optigrit fuels the success of countless global enterprises !</p>
          </div>
          <div className="aboutTextCon">
            <div className="aboutTextLeft">
              <p>
                Welcome to Optigrit, where innovation and creativity meet limitless possibilities.
                We are your all-in-one platform dedicated to empowering individuals and
                organizations on their path to success. Whether you're a student, a professional, or
                an entrepreneur, our dynamic hub offers a wide array of features, including coding
                challenges, website creation, contest hosting, and course sales and much more!
                <br />
                <br />
                At Optigrit, we believe that creativity has no bounds, and we're here to provide you
                with the tools and resources needed to bring your ideas to life. Our user-friendly
                interface ensures a seamless experience, while our dedicated support team is ready
                to assist you every step of the way.
                <br />
                <br />
                Join our global community of creators and achievers who have already harnessed the
                transformative power of Optigrit. It's time to unleash your full potential and make
                your mark in the world. Explore Optigrit today and embark on a journey of innovation
                and success like never before.
              </p>
            </div>
            <div>
              <img className="aboutDesktop" src={ABOUT} alt="" />
              <img className="aboutPhone" src={ABOUTPHN} alt="" />
            </div>
          </div>
          <div>
            <button className="aboutBtnCon" onClick={handleButtonClick}>
              Get Started <img src={BTN} alt="" />
            </button>
          </div>
        </div>
        <div className="aboutLowerCon">
          {list.map(({ id, img, head, text }) => (
            <div className="aboutCardCon" key={id}>
              <img src={img} alt="" />
              <div className="aboutCardCon2">
                <p>{head}</p>
              </div>
              <div className="aboutCardCon3">
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
