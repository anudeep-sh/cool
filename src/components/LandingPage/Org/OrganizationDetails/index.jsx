import React from 'react';
import '../ViewOrganizations.css';
import OrgPhone from './DetailsPhone';
import OrgDesktop from './DetailsDesktop';

export default function OrgDetails({ OrgData, orgMemberData, myCoursesData }) {
  return (
    <div>
      <div>
        <OrgPhone Data={OrgData} orgMemberData={orgMemberData} myCoursesData={myCoursesData} />
      </div>
      <div>
        <OrgDesktop Data={OrgData} orgMemberData={orgMemberData} myCoursesData={myCoursesData} />
      </div>
    </div>
  );
}
