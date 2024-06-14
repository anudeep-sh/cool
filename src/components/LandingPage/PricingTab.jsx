import React, { useEffect, useState } from 'react';
import Navbar from '../Header/Navbar';
import Footer from '../../components/Header/Footer';
import './Plans.css';
import checkbox from '../../assets/LandingPage/Plans/checkmark.svg';
import readMoreIcon from '../../assets/LandingPage/Plans/more.svg';
import { plansAPI } from '../../api/requests/plans';
import BigLoader from '../Skeleton/BigLoader';
import { useNavigate } from 'react-router-dom';

import { handleAlert } from '../../utils/handleAlert';

const Plans = () => {
  const isLoggedIn = localStorage.getItem('Token');
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    plansAPI
      .getPublicPlans()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        handleAlert('Something went wrong! please try again later', 'error');
        setLoading(false);
      });
  }, []);

  return loading ? (
    <BigLoader />
  ) : (
    <>
      <div className="planSection">
        <Navbar />
        <div className="planCon" style={{ width: '95%', marginTop: '2rem' }}>
          <h2 className="planHead" style={{ paddingTop: '1.5rem', letterSpacing: '2px' }}>
            Choose a plan
          </h2>
          <h5 className="planSubhead" style={{ paddingBottom: '2rem' }}>
            Select the plan that fits your needs.
          </h5>
          <div className="planDiv">
            {data?.plans?.map((plan, key) => {
              return (
                <div
                  className="planCard backgroundDisabled"
                  style={{ padding: '1.5rem', height: '500px' }}
                >
                  <div>
                    <h1 className="planCardHead">{plan.name}</h1>
                  </div>
                  <div className="planCardPrice">
                    {plan.price}
                    {plan.price !== 'Free' && <span className="planCardPer">/Month</span>}
                  </div>
                  <span className="planCardSubhead">{plan.description}</span>
                  <ul>
                    {JSON.parse(plan.data).map((feature, key) => {
                      return (
                        <li className="planCardList">
                          <img src={checkbox} alt="" />
                          <span>{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    onClick={() => {
                      if (isLoggedIn) navigate('/organization');
                      else navigate('/sign-in');
                    }}
                  >
                    <span>Get Started</span>
                    <img src={readMoreIcon} alt="" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Plans;
