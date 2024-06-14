import React from 'react';
import LandingPageHero from '../../components/LandingPage/LandingPageHero';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Header/Footer';
import FEATURES from '../../components/LandingPage/Features';
import { useDocumentTitle } from '../../utils/useDocumentTitle';

export default function Home() {
  useDocumentTitle('Home')
  return (
    <div>
      <Navbar />
      <LandingPageHero />
      <FEATURES />
      <Footer />
    </div>
  );
}
