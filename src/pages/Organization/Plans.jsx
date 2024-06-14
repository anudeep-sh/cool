import React, { useEffect, useState } from 'react';
import './OrgPlans.css';
import { useNavigate } from 'react-router-dom';
import checkbox from '../../assets/LandingPage/Plans/checkmark.svg';
import readMoreIcon from '../../assets/LandingPage/Plans/more.svg';
import { plansAPI } from '../../api/requests/plans';
import BigLoader from '../../components/Skeleton/BigLoader';
import { handleAlert } from '../../utils/handleAlert';
import { getOrgName } from '../../utils/appendOrgQuery';

const OrgPlans = () => {
  const orgName = getOrgName();
  const navigate = useNavigate();

  const [currPlanPrice, setCurrPlanPrice] = useState(null);
  const drawerWidth = 200;
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    plansAPI
      .getPlans()
      .then((response) => {
        setData(response);
        setCurrPlanPrice(response?.currentPlan[0]?.price);
        localStorage.setItem('currentPlan', JSON.stringify(response?.currentPlan[0]));
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
    <div className="planSection" style={{ marginLeft: `${drawerWidth}px` }}>
      <div>
        <h2
          className="planHead"
          style={{ marginTop: '2rem', color: 'black', letterSpacing: '2px' }}
        >
          Choose a plan
        </h2>
        <h5 className="planSubhead" style={{ color: 'black', paddingBottom: '1rem' }}>
          Select the plan that fits your needs.
        </h5>
        <div className="planDiv">
          {data?.currentPlan?.map((plan, key) => {
            return (
              <div
                className="planCard backgroundDisabled"
                style={{
                  height: '550px',
                  padding: '1.5rem',
                  marginTop: '2rem',
                  width: '375px',
                }}
              >
                <div>
                  <h1 className="planCardHead">{plan.name}</h1>
                  <span className="activeNote">● Active</span>
                </div>
                <div>
                  Valid Upto:{' '}
                  {plan?.validUpTo === 0
                    ? 'Lifetime'
                    : new Date(parseInt(plan?.validUpTo)).toDateString().slice(4)}
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
                        <img src={checkbox} />
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
                {plan.name !== 'Free Plan' ? (
                  <button
                    onClick={(e) => {
                      localStorage.setItem('planToBuy', JSON.stringify(plan));
                      navigate(`/org/${orgName}/checkout/${plan.id}`);
                    }}
                  >
                    <span>Extend</span>
                    <img src={readMoreIcon} />
                  </button>
                ) : (
                  <button disabled>
                    <span>Buy Now</span>
                    <img src={readMoreIcon} />
                  </button>
                )}
              </div>
            );
          })}
          {data?.availablePlans?.map((plan, key) => {
            return (
              <div
                className="planCard"
                style={{
                  height: '550px',
                  padding: '1.5rem',
                  marginLeft: '3.5rem',
                  marginTop: '2rem',
                  width: '375px',
                }}
              >
                <h1 className="planCardHead">{plan.name}</h1>
                <div className="planCardPrice">
                  {plan.price}
                  {plan.price !== 'Free' && <span className="planCardPer">/Month</span>}
                </div>

                <span className="planCardSubhead">{plan.description}</span>

                <ul>
                  {JSON.parse(plan.data).map((feature, key) => {
                    return (
                      <li className="planCardList">
                        <img src={checkbox} />
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
                <button
                  disabled={plan.name === 'Free Plan' ? true : false}
                  onClick={(e) => {
                    localStorage.setItem('planToBuy', JSON.stringify(plan));
                    navigate(`/org/${orgName}/checkout/${plan.id}`);
                  }}
                >
                  {currPlanPrice !== null && plan.price > currPlanPrice ? (
                    <span>Upgrade</span>
                  ) : (
                    <span>Buy Now</span>
                  )}
                  <img src={readMoreIcon} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrgPlans;
