import React from 'react';
import './Careers.css';
import Footer from '../../components/Header/Footer';
import Navbar from '../../components/Header/Navbar';
import CARD1 from '../../assets/LandingPage/Careers/card_1.svg';
import CARD2 from '../../assets/LandingPage/Careers/card_2.svg';
import CARD3 from '../../assets/LandingPage/Careers/card_3.svg';
import CARD4 from '../../assets/LandingPage/Careers/card_4.svg';
import SEARCH from '../../assets/LandingPage/Careers/search.svg';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

export default function Careers() {
  useDocumentTitle('Careers')
  const list = [
    {
      id: 1,
      img: CARD1,
      heading: 'Flexible Working Hours',
    },
    {
      id: 2,
      img: CARD2,
      heading: 'Remote Work',
    },
    {
      id: 3,
      img: CARD3,
      heading: 'Flexible Career Path',
    },
    {
      id: 4,
      img: CARD4,
      heading: 'Employee Rewards and bonuses',
    },
  ];
  return (
    <>
      <Navbar />
      <div className="careersCon">
        <p className="careersHead">Be a part of our Mission 🎯</p>
        <p className="careersSubHead">
          Are you prepared to leverage your expertise and experience to tackle thrilling new
          opportunities? Whether it's about acquiring new skills or stepping into a leadership role,
          this is your opportunity to elevate your career to the next stage. Begin your job search
          and submit your application today.
        </p>
        <div className="careersSubCon">
          <div className="careersSubUpper">
            <p className="jobHead">Job Search</p>
            <input className="jobInput" type="text" placeholder="Enter Job Title" disabled />
            <div className="careersOpen">
              <p className="careersOpen1">
                Sorry, there are no <br /> openings available now <br /> :\
              </p>
              <p className="careersOpen2">Got other ideas?</p>
              <p className="careersOpen3">
                Send us your CV to <br />{' '}
                <a href="mailto:support@optigrit.com">support@optigrit.com</a>
              </p>
            </div>
          </div>
          <div className="careersSubDown">
            <p className="benefitsHead">Benefits</p>
            <div className="benefitsCardCon">
              {list.map(({ id, img, heading }) => (
                <div id={id} className="CareerCard">
                  <img src={img} alt="" />
                  <p className="careersCardHeading">{heading}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
