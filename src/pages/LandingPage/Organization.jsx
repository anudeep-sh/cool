import React from 'react';
import Nav from '../../components/Header/Navbar';
import Footer from '../../components/Header/Footer';
import Mid from '../../components/LandingPage/Org/OrganizationsPage';
import CreateOrgRestrictionPopUp from '../../components/RestrictPopUp/createOrgRestrictionPopUp';

export default function OrganizationHomePage() {
  return (
    <div>
      <CreateOrgRestrictionPopUp />
      <Nav />
      <Mid />
      <Footer />
    </div>
  );
}
