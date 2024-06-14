import React, { useState, useEffect, useRef } from 'react';
import './JoinOrgPopup.css';
import ViewIconWhite from '../../../assets/LandingPage/Org/viewOrgWhiteIcon.svg';
import JoinIconWhite from '../../../assets/LandingPage/Org/joinOrgWhiteIcon.svg';
import { organizationAPI } from '../../../api/requests/organization/organizationAPI';

export default function JoinOrgPopup({ onClose, code }) {
  const [organization, setOrganization] = useState(null);
  const popupRef = useRef();
  const fetchOrganization = async (code) => {
    try {
      const response = await organizationAPI.searchOrganizationByCode(code);
      setOrganization(response);
    } catch (error) {
      console.error('Error fetching suggested organizations:', error);
    }
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.classList.add('CreateOrgPopup-open');
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.classList.remove('CreateOrgPopup-open');
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  useEffect(() => {
    fetchOrganization(code);
  }, [code]);
  if (!organization) {
    return null;
  }
  const renderProfilePhoto = ({ logoLink, name }) => {
    if (logoLink) {
      return <img className="ViewOrg-LogoImg" src={logoLink} alt="" />;
    } else {
      const firstNameInitial = name?.charAt(0) || '';

      return (
        <div className="SuggestedOrginitials-container">
          <span>{firstNameInitial}</span>
        </div>
      );
    }
  };
  return (
    <div className="JoinOrgPopup">
      <div className="JoinOrgPopup-main" ref={popupRef}>
        <button className="JoinOrgClose-btn" onClick={onClose}>
          &times;
        </button>
        <div className="JoinOrgClosePopup-content">
          <p className="JoinOrgClosePopup-Heading">Join Organizations:</p>
          <p className="JoinOrgClosePopup-SubHeading">
            Explore the featured organizations to be a part of it with groups of people who share a
            team, course or mutual interest by requesting to be a part of it.
          </p>
        </div>
        <div>
          <div className="JoinOrg-orgsCon">
            {organization.map((organization) => (
              <div key={organization.id} className="JoinOrg-orgsRow">
                {renderProfilePhoto({ logoLink: organization.logoLink, name: organization.name })}
                <div className="JoinOrg-orgsRowLeft">
                  <div>
                    <p className="JoinOrg-orgsName">{organization.name}</p>
                    <p className="JoinOrg-orgsCreator">{organization.creator.username || ''}</p>
                  </div>
                  <div className="JoinOrg-orgsBtnDiv">
                    <button className="JoinOrg-orgsViewBtn">
                      View Org
                      <img src={ViewIconWhite} alt="" />
                    </button>
                    <button className="JoinOrg-orgsRequestBtn">
                      Request to Join
                      <img src={JoinIconWhite} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
