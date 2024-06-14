import React, { useState } from 'react';
import Footer from '../../components/Header/Footer';
import Navbar from '../../components/Header/Navbar';
import IMG1 from '../../assets/LandingPage/Our Products/card_1.svg';
import IMG2 from '../../assets/LandingPage/Our Products/card_2.svg';
import IMG3 from '../../assets/LandingPage/Our Products/card_3.svg';
import RIGHT from '../../assets/LandingPage/Our Products/btn.svg';
import RIGHT_HOVER from '../../assets/LandingPage/Our Products/btn_phone.svg';
import { useNavigate } from 'react-router-dom';
import LOGO from '../../assets/LandingPage/Our Products/optigrit_logo.svg';
import './Products.css';
import { Navigate } from 'react-router-dom';
import { useDocumentTitle } from '../../utils/useDocumentTitle';
export default function Products() {
  useDocumentTitle('Our Products')
  const navigate = useNavigate();
  const handleHover = (id, state) => {
    const updatedList = list.map((item) => (item.id === id ? { ...item, isHovered: state } : item));
    setList(updatedList);
  };

  const [list, setList] = useState([
    {
      id: 1,
      img: IMG1,
      head: 'Task Management',
      text: 'Experience seamless task management, redefining your work process for enhanced organization, collaboration, and productivity.',
      link: '/organization',
      isHovered: false,
    },
    {
      id: 2,
      img: IMG2,
      head: 'Contest Management',
      text: 'Elevate your contests to a new level with our intuitive contest management, making hosting and participating a breeze.',
      link: '/organization',
      isHovered: false,
    },
    {
      id: 3,
      img: IMG3,
      head: 'Course Management',
      text: 'Elevate your course management experience custom-tailored to enhance learning and foster a dynamic educational environment.',
      link: '/organization',
      isHovered: false,
    },
  ]);
  return (
    <>
      <Navbar />
      <div className="ourProducts">
        <p className="productPageHeading">
          Empower your company or business with the tools it deserves !
        </p>
        <div className="productsSecHalf">
          <img src={LOGO} alt="" />
          <div className="productsCardsCon">
            {list.map(({ id, img, head, text, link, isHovered }) => (
              <div className="productsCard" key={id}>
                <div className="productsImgCon">
                  <img src={img} alt="" />
                </div>
                <p className="productsHead">{head}</p>
                <p className="productsText">{text}</p>
                <div className="productsBtnDiv">
                  <button
                    className="productsBtn"
                    onClick={() => navigate(link)}
                    onMouseEnter={() => handleHover(id, true)}
                    onMouseLeave={() => handleHover(id, false)}
                  >
                    Learn More
                    <img src={isHovered ? RIGHT_HOVER : RIGHT} alt="" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
