import React, { useState, useEffect } from 'react';
import { ASSET_CONFIGS } from '../../assets/assetConfigs';
import { getOrgData } from '../../organization';
import ICON1 from '../../assets/LandingPage/Footer/in_icon.svg';
import ICON2 from '../../assets/LandingPage/Footer/f_icon.svg';
import ICON3 from '../../assets/LandingPage/Footer/x_icon.svg';
import ICON4 from '../../assets/LandingPage/Footer/insta_icon.svg';
import PLUS from '../../assets/LandingPage/Footer/plus_icon.svg';
import LOGO from '../../assets/LandingPage/Footer/opti_logo.svg';
import PLUS_HOVER from '../../assets/LandingPage/Footer/plus_icon_hover.svg';
import EMAIL_ICON from '../../assets/LandingPage/Footer/email_icon.svg';
import './Footer.css';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const [plusIcon, setPlusIcon] = useState(PLUS);
  const [domainData, setDomainData] = useState(null);
  const getDomainData = async () => {
    const data = await getOrgData();
    if (data) {
      setDomainData(data);
    }
  };

  useEffect(() => {
    getDomainData();
  }, []);

  const imagesObj = JSON.parse(localStorage.getItem('imagesObj'));
  let contact_logo_footer_url = imagesObj && imagesObj[ASSET_CONFIGS.CONTACT_LOGO_FOOTER];
  const info = [
    {
      id: 1,
      title: 'About Us',
      link: '/about-us',
    },
    // {
    //   id: 2,
    //   title: 'Blog',
    //   link: '',
    // },
    {
      id: 2,
      title: 'FAQ',
      link: '/faq',
    },
  ];
  const links = [
    {
      id: 1,
      title: 'Support',
      link: '/contact-support',
    },
    {
      id: 2,
      title: 'Terms & Conditions',
      link: '/terms&conditions',
    },
    {
      id: 3,
      title: 'Privacy Policy',
      link: '/privacy-policy',
    },
    {
      id: 4,
      title: 'Refund & Cancellation policy',
      link: '/refund-cancellation',
    }
  ];
  const icons = [
    {
      id: 1,
      img: ICON1,
      link: 'https://www.linkedin.com/company/simppwey-private-limited/',
    },
    // {
    //   id: 2,
    //   img: ICON2,
    //   link: '',
    // },
    {
      id: 3,
      img: ICON3,
      link: '',
    },
    // {
    //   id: 4,
    //   img: ICON4,
    //   link: '',
    // },
  ];

  return (
    <div className="footerCompleteCon">
      <div className="footerUpCon">
        <div className="footerUp1">
          <a href="/">
            <img src={LOGO} alt="" />
          </a>
        </div>
        <div className="footerUp2">
          <h5>Information</h5>
          <ul>
            {info.map(({ id, title, link }) => (
              <a href={link} key={id} style={{ textDecoration: 'none', cursor: 'default' }}>
                <li className="footerInfoLi">{title}</li>
              </a>
            ))}
          </ul>
        </div>
        <div className="footerUp3">
          <h5>Helpful links</h5>
          <ul>
            {links.map(({ id, title, link }) => (
              <a href={link} key={id} style={{ textDecoration: 'none' }}>
                <li className="footerLinksLi" key={title}>
                  {title}
                </li>
              </a>
            ))}
          </ul>
        </div>
        <div className="footerUp4">
          <h5>Subscribe for more info</h5>
          {/* <div className="inputIconWrapper">
            <input className="footerInput" type="text" placeholder="Enter Your Email" disabled />
            <img src={EMAIL_ICON} alt="input-icon" className="inputIcon" />
          </div> */}
          <button
            className="footerSubBtn"
            onClick={() => navigate('/contact-support')}
            onMouseEnter={() => setPlusIcon(PLUS_HOVER)}
            onMouseLeave={() => setPlusIcon(PLUS)}
          >
            Subscribe
            <img src={plusIcon} alt="" />
          </button>
        </div>
      </div>
      <div className="footerDownCon">
        <div className="footerDown1">
          {icons.map(({ id, img, link }) => (
            <a href={link} key={id} target="_blank" rel="noopener noreferrer">
              <img src={img} alt="" />
            </a>
          ))}
        </div>
        <div className="footerDown2">
        <p>Owned By LAKANAVARAPU NAGA MANIKANTA ANUDEEP</p>
          <p>©️ Optigrit Technologies Private Limited. Copyright. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
