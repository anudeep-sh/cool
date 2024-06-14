import React from 'react';
import Nav from '../../components/Header/Navbar';
import Footer from '../../components/Header/Footer';
import Mid from '../../components/LandingPage/Org/OrganizationsPage';
import Invite from '../../components/Invite/Invite';
import { useParams } from 'react-router-dom';
export default function EmailInvite({ setSelectedOrgName }) {
  const { inviteId } = useParams();
  return (
    <div>
      <Invite inviteId={inviteId} setSelectedOrgName={setSelectedOrgName} />
      <Nav />
      <Mid />
      <Footer />
    </div>
  );
}
