import React, { useState, useEffect, useRef } from 'react';
import './SuggestedOrganizations.css';
import ViewSearchIconBtn from '../../../assets/LandingPage/Org/SearchOrgBtnIcon.svg';
import ViewSearchIcon from '../../../assets/LandingPage/Org/searchOrgIcon.svg';
import ViewIconWhite from '../../../assets/LandingPage/Org/viewOrgWhiteIcon.svg';
import RequestToJoinBtn from './Buttons/RequestToJoin';
import { organizationAPI } from '../../../api/requests/organization/organizationAPI';
import ViewOrganizationPopup from './ViewOrganizations';
export default function SuggestedOrganizations({ onClose, withSideBar }) {
  const [suggestedOrganizations, setSuggestedOrganizations] = useState([]);
  const [searchedOrganizations, setSearchedOrganizations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [selectedOrgName, setSelectedOrgName] = useState('');
  const popupRef = useRef();

  const openView = (organizationName) => {
    setSelectedOrgName(organizationName);
  };

  const fetchSuggestedOrganizations = async () => {
    try {
      const response = await organizationAPI.getSuggestedOrganizations();
      setSuggestedOrganizations(response);
    } catch (error) {
      console.error('Error fetching suggested organizations:', error);
    }
  };
  const fetchSearchedOrganizations = async () => {
    try {
      setIsSearching(true);
      const response = await organizationAPI.searchOrganizationByName(orgName);
      setSearchedOrganizations(response);
    } catch (error) {
      console.error('Error fetching searched organizations:', error);
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
    fetchSuggestedOrganizations();

    return () => {
      document.body.classList.remove('CreateOrgPopup-open');
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  const arrayToBeRendered = isSearching ? searchedOrganizations : suggestedOrganizations;
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
    <div className="ViewOrgPopup">
      <div
        className={withSideBar ? 'ViewOrgPopup-main-SideBar' : 'ViewOrgPopup-main'}
        ref={popupRef}
      >
        <button className="ViewOrgClose-btn" onClick={onClose}>
          &times;
        </button>
        <div className="ViewOrgClosePopup-content">
          <p className="ViewOrgClosePopup-Heading">Public organizations</p>
          <p className="ViewOrgClosePopup-SubHeading">
            Join organizations for close collaboration with a group of individuals within your
            organization who share a team, course or mutual interest.
          </p>
          <div className="ViewOrgmidddle">
            <p className="ViewOrgInput-searchHead">Search Organizations: </p>
            <div className="ViewOrgmidddle-second">
              <div className="ViewOrgInput-group">
                <img src={ViewSearchIcon} alt="" className="ViewOrgSearch-icon" />
                <input
                  type="text"
                  placeholder="Enter org name"
                  className="ViewOrgClosePopup-placeholder1"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
              <button className="ViewOrgInput-searchBtn" onClick={fetchSearchedOrganizations}>
                Search <img src={ViewSearchIconBtn} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="ViewOrg-suggestedHead">Suggested Organizations:</p>
          <div className="ViewOrg-orgsCon">
            {arrayToBeRendered.map((organization) => (
              <div key={organization.id} className="ViewOrg-orgsRow">
                <div className="ViewOrg-orgsRowLeft">
                  <div>
                    {renderProfilePhoto({
                      logoLink: organization.logoLink,
                      name: organization.name,
                    })}
                  </div>
                  <div className="ViewOrg-orgsInfo">
                    <p className="ViewOrg-orgsName">{organization.name}</p>
                    <p className="ViewOrg-orgsCreator">{organization.creator?.username || ''}</p>
                  </div>
                </div>

                <div className="ViewOrg-orgsBtnDiv">
                  <button
                    className="ViewOrg-orgsViewBtn"
                    onClick={() => openView(organization.name)}
                  >
                    View Org
                    <img src={ViewIconWhite} alt="" />
                  </button>
                  <RequestToJoinBtn
                    disabled={organization.isAlreadyRequested}
                    OrganizationID={organization.id}
                  />
                </div>
              </div>
            ))}
            {selectedOrgName && (
              <ViewOrganizationPopup
                selectedOrgName={selectedOrgName}
                setSelectedOrgName={setSelectedOrgName}
                withoutSidebar={'true'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
