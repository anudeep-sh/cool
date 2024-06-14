import React from 'react';
import '../ViewOrganizations.css';
import RequestToJoinBtn from '../Buttons/RequestToJoin';

export default function OrgPhone({ Data, orgMemberData, myCoursesData }) {
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
    <div className="viewFirstRowPhone">
      <div className="viewFirstRowPhone-1">
        {renderOrgProfilePhoto()} <p className="viewFirstRow-info1Head">{Data.name}</p>
      </div>
      <div className="viewFirstRowPhone-2">
        <div>
          <div className="viewFirstRow-info1Desc">{Data.description}</div>
        </div>
        <div className="viewFirstRow-info2">
          <div className="viewFirstRow-info2Head">Details :</div>
          <p>Team Members : &nbsp;{orgMemberData.length}</p>
          <p>No of Courses : &nbsp;{myCoursesData?.length}</p>
          <p>No of Tasks : &nbsp;{Data.tasks.totalTasks}</p>
        </div>
      </div>
      <RequestToJoinBtn disabled={Data.isAlreadyRequested} OrganizationID={Data.id} />
    </div>
  );
}
