import React from 'react';
import '../ViewOrganizations.css';
import CreationDetails from './CreationDetail';
export default function Creation({ CreationData }) {
  const formattedDate = new Date(CreationData.created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="viewSecondRow-orgDetails1">
      <CreationDetails
        heading={'Creator'}
        subheading={`${CreationData?.creator?.firstName} ${CreationData?.creator?.lastName}`}
        heading2={'Date of Creation :'} subheading2={formattedDate}
      />
      {/* <CreationDetails heading={'Date of Creation :'} subheading={formattedDate} /> */}
    </div>
  );
}
