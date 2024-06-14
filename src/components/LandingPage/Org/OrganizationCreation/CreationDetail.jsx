import React from 'react';
import '../ViewOrganizations.css';
export default function CreationDetail({ heading, subheading, heading2, subheading2 }) {
  return (
    <div className="viewSecondRow-orgDetailsUser">
      <p>{heading}</p>
      <span>{subheading}</span>
      <br />
      <p>{heading2}</p>
      <span>{subheading2}</span>
    </div>
  );
}
