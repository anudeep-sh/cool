import React from 'react';
import { Container, Divider } from '@mui/material';
import Navbar from '../Header/Navbar';
import Footer from '../Header/Footer';
import './TC&PrivacyPolicy.css';

const RefundCancellation = () => {
  return (
    <>
      <Navbar />
      <div className="TopHeading">
        <Container maxWidth="md">
          <div gutterBottom className="HeadingCon">
            Optigrit Refund and Cancellation Policy
          </div>
          <div className="text">
            At Optigrit, we strive to provide a seamless and satisfactory experience for all our
            users. However, we understand that circumstances may arise where a refund or
            cancellation is necessary. Please review our Refund & Cancellation Policy below:
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">Refunds</h6>

          <ol className="text">
            <li className="list">
              We do not offer refunds for subscription fees or usage charges.
            </li>
            <li className="list">
              Once a payment is made, it is non-refundable, regardless of usage or subscription
              duration.
            </li>
          </ol>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">Cancellation</h6>
          <ol className="text">
            <li className="list">
              You may cancel your subscription at any time through your account settings.
            </li>
            <li className="list">
              Upon cancellation, your access to the platform and its services will continue until
              the end of your current billing cycle.
            </li>
          </ol>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">Exceptions</h6>
          <ol className="text">
            <li className="list">
              {' '}
              In rare cases of billing errors or discrepancies, please contact our support team at
              support@optigrit.com for assistance.
            </li>
            <li className="list">
              {' '}
              Optigrit reserves the right to assess refund requests on a case-by-case basis for
              exceptional circumstances.
            </li>
          </ol>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">Contact Us</h6>
          <div className="text">
            If you have any questions or concerns regarding refunds or cancellations, please reach
            out to our dedicated support team at support@optigrit.com. We are here to help and
            ensure your experience with Optigrit is positive and fulfilling.
          </div>
          <div className="text">
            Thank you for choosing Optigrit for your learning content management needs.
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default RefundCancellation;
