import React from 'react';
import { Container, Divider } from '@mui/material';
import Navbar from '../Header/Navbar';
import Footer from '../Header/Footer';
import './TC&PrivacyPolicy.css';
const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="TopHeading">
        <Container maxWidth="md">
          <div gutterBottom className="HeadingCon">
            Optigrit Privacy Policy
          </div>
          <h6 className="head6">1. Introduction</h6>
          <div className="text">
            Optigrit ("we," "us," or "our") respects the privacy of our users ("you" or "your").
            This Privacy Policy describes how we collect, use, and disclose information about you
            when you use our platform ("Platform") and the services we offer (collectively, the
            "Services").
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">2. Information We Collect</h6>
          <div className="text">
            We collect several types of information from and about users of our Services:
            <ol className="text">
              <li className="list">
                Account Information: When you create an account, we collect your name, email
                address, and any other information you choose to provide.
              </li>
              <li className="list">
                Usage Data: We collect information about how you use the Services, such as the
                features you access, the content you upload, and the time and date of your activity.
              </li>
              <li className="list">
                Log Data: We automatically collect standard log data when you use the Services, such
                as your IP address, browser type, device information, and referring website.
              </li>
              <li className="list">
                Content Data: You may upload content to the Platform, such as videos, presentations,
                documents, and course materials. We store this content to provide the Services.
              </li>
            </ol>
          </div>

          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">3. How We Use Your Information</h6>
          <div className="text">
            We use the information we collect for various purposes, including:
          </div>
          <ol className="text">
            <li className="list">Provide and operate the Services</li>
            <li className="list">Create and maintain your account</li>
            <li className="list">
              Send you important information about the Services, including updates, security alerts,
              and support messages
            </li>
            <li className="list">Respond to your inquiries and support requests</li>
            <li className="list">
              Monitor and analyze use of the Services to improve our offerings
            </li>
            <li className="list">Personalize your experience with the Services</li>
            <li className="list">Enforce our Terms and Conditions</li>
          </ol>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">4. Sharing your information</h6>
          <div className="text">
            We may share your information with third-party service providers who help us operate the
            Services. These service providers are obligated to protect your information and use it
            only to provide the services we request. We may also disclose your information if we are
            required to do so by law or in the good faith belief that such disclosure is necessary
            to comply with legal process, protect the safety of others, or investigate fraud.
          </div>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">5. Data Retention</h6>
          <div className="text">
            We will retain your information for as long as your account is active or as needed to
            provide you with the Services. We may also retain your information for a longer period
            as required by law or to comply with our legal obligations.
          </div>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">6. Your Choices</h6>
          <div className="text">
            You can access and update your account information at any time. You can also choose to
            close your account by contacting us.
          </div>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">7. Security</h6>
          <div className="text">
            We take reasonable steps to protect your information from unauthorized access,
            disclosure, alteration, or destruction. However, no internet transmission or electronic
            storage is completely secure.
          </div>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">8. Children's Privacy</h6>
          <div className="text">
            Our Services are not intended for children under the age of 13. We do not knowingly
            collect personal information from children under 13. If you are a parent or guardian and
            you believe your child has provided us with personal information, please contact us.
          </div>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">9. International Transfers</h6>
          <div className="text">
            Your information may be transferred to and processed in countries other than your own.
            These countries may have different data protection laws than your own country.
          </div>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">10. Changes to this Privacy Policy</h6>
          <div className="text">
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on our Platform.
          </div>
          <Divider color="white" sx={{ m: 4 }} />
          <h6 className="head6">11. Contact Us</h6>
          <div className="text">
            If you have any questions about this Privacy Policy, please contact us at
            support@optigrit.com
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
