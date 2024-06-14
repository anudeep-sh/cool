import React, { useState, useEffect, useRef } from 'react';
import { organizationAPI } from '../../../api/requests/organization/organizationAPI';
import Skeletons from '../../Skeleton/Skeletons';
import OrganizationMembers from './OrganizationMembers/MembersList';
import Product from '../../ProductCarousel/Product';
import OrganizationDetails from './OrganizationDetails/index';
import './ViewOrganizations.css';

function ViewOrganizationPopup({ selectedOrgName, setSelectedOrgName }) {
  const [isLoading, setLoading] = useState(true);
  const [myCoursesData, setMyCoursesData] = useState([]);
  const [orgDetails, setOrgDetails] = useState(null);
  const [orgMemberData, setOrgMemberData] = useState(null);
  const popupRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const orgResponse = await organizationAPI.searchViewOrganizationByName(selectedOrgName);
      setOrgDetails(orgResponse.data);
      const orgMembers = orgResponse.data.members;
      setOrgMemberData(orgMembers);
      setMyCoursesData(orgResponse.data.courses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedOrgName(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.classList.remove('View-open');
    };
  }, []);

  return isLoading ? (
    <Skeletons type="CircularLoader" />
  ) : (
    <div>
      <div className="View" ref={popupRef}>
        <div className="View-main-withoutSidebar">
          <button
            className="View-btn"
            onClick={() => {
              setSelectedOrgName(null);
            }}
          >
            &times;
          </button>
          <OrganizationDetails
            OrgData={orgDetails}
            orgMemberData={orgMemberData}
            myCoursesData={myCoursesData}
            orgName={selectedOrgName}
          />
          <div className="viewSecondRow">
            <div className="viewSecondRow-orgDetails">
              <div></div>
              <div className="viewSecondRow-orgDetailsMembers">
                <p>Members : </p>
                <OrganizationMembers
                  members={orgMemberData}
                  showEmail={false}
                  inviteAccepted={false}
                  inviteRejected={false}
                  inviteReceived={false}
                />
              </div>
            </div>
            <div className="viewSecondRow-orgCoursesDiv">
              <Product
                forSuggestedOrgPopup={'true'}
                title={'Courses'}
                dataRender={myCoursesData}
                loading={isLoading}
                disableHover={false}
                showDescription={true}
              />
            </div>
          </div>
          <div className="view-RequestToJoinBtnDiv"></div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrganizationPopup;
