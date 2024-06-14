import React from 'react';
import '../ViewOrganizations.css';
import RequestToJoinBtn from '../Buttons/RequestToJoin';
export default function OrgDesktop({ Data, orgMemberData, myCoursesData }) {
  if (!Data) {
    return null;
  }
  const renderOrgProfilePhoto = () => {
    if (Data.logoLink) {
      return <img className="viewFirstRow-logoImg" src={Data.logoLink} alt="" />;
    } else {
      const orgInitials = Data.name?.charAt(0) || '';
      return (
        <div className="orgLogo-initials-container">
          <span>{orgInitials}</span>
        </div>
      );
    }
  };
  return (
    <div className="viewFirstRow">
      <div className="viewFirstRow-logo">{renderOrgProfilePhoto()} </div>
      <div className="viewFirstRow-info">
        <div className="viewFirstRow-infoDiv1">
          <div className="viewFirstRow-info1Head">
            {Data.name}
            <span>
              Creator: {Data?.creator?.firstName} {Data?.creator?.lastName}
            </span>
          </div>
          <div className="viewFirstRow-info1Desc">{Data.description}</div>
          <RequestToJoinBtn disabled={Data.isAlreadyRequested} OrganizationID={Data.id} />
        </div>
        <div className="viewFirstRow-info2">
          <p>Team Members : &nbsp;{orgMemberData.length}</p>
          <p>No of Courses : &nbsp;{myCoursesData?.length}</p>
          <p>No of Tasks : &nbsp;{Data.tasks.totalTasks}</p>
        </div>
      </div>
    </div>
  );
}
