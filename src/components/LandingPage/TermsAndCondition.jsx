import React from 'react';
import { Container, Divider } from '@mui/material';
import Navbar from '../Header/Navbar';
import Footer from '../Header/Footer';
import './TC&PrivacyPolicy.css';
const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <div className="TopHeading">
        <Container maxWidth="md">
          <div gutterBottom className="HeadingCon">
            Optigrit Terms and Conditions (SaaS platform)
          </div>
          <h6 className="head6">1. Acceptance</h6>
          <div className="text">
            These Terms and Conditions ("Terms") govern your access to and use of the Optigrit
            platform ("Platform") for learning content management, including any services,
            functionalities, content, or applications offered by Optigrit (collectively, the
            "Services"). By accessing or using the Services, you agree to be bound by these Terms.
            If you disagree with any part of these Terms, you may not access or use the Services.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">2. Description of Services</h6>
          <div className="text">
            Optigrit provides a software-as-a-service (Saas) solution that empowers organizations
            and individuals to create and manage their own learning experiences. In just minutes,
            you can set up a powerful platform to:
          </div>
          <ol className="text">
            <li className="list">
              Effortless Setup: Create your organization with a few clicks and a user-friendly
              interface.
            </li>
            <li className="list">
              Complete Customization: Upload logos, banners, and customize the look and feel to
              match your brand identity.
            </li>
            <li className="list">
              Content Management: Upload any type of learning material, including videos,
              presentations, documents, and more.
            </li>
            <li className="list">
              Course Creation (Optional): Structure your content into organized learning paths with
              modules, quizzes, and assessments (this functionality is optional for you to
              implement).
            </li>
            <li className="list">
              Task Management: Assign tasks to individuals or teams, set deadlines, and track
              completion. Tasks can be linked to specific courses or be completely custom.
            </li>
            <li className="list">
              Contest Management (Under Development): Run frontend development contests using APIs.
              The platform can analyze community reviews to identify valuable feedback and score
              submissions.
            </li>
            <li className="list">
              Progress Tracking: Gain insights into learner engagement and completion rates.
            </li>
          </ol>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">3. User Accounts</h6>
          <div className="text">
            You may need to create an account to access certain features of the Services. You are
            responsible for maintaining the confidentiality of your account credentials and are
            fully responsible for all activities that occur under your account. You agree to notify
            Optigrit immediately of any unauthorized use of your account or any other breach of
            security. Optigrit reserves the right to suspend or terminate your account at any time
            without notice for any reason, including, but not limited to, breach of these Terms.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">4. Content Ownership</h6>
          <div className="text">
            You retain all ownership rights to the content you upload to the Platform ("Your
            Content"). You grant Optigrit a non-exclusive, worldwide, royalty-free license to use,
            reproduce, modify, publish, and distribute Your Content solely for the purpose of
            providing the Services.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">5. User Conduct</h6>
          <div className="text">
            You agree to use the Services in a lawful and respectful manner. You will not:
          </div>
          <ol className="text">
            <li className="list">
              Upload any content that is illegal, harmful, threatening, abusive, harassing,
              defamatory, obscene, hateful, or racially or ethnically offensive.
            </li>
            <li className="list">Violate any intellectual property rights of others.</li>
            <li className="list">
              Transmit any viruses, worms, Trojan horses, or other malicious code.
            </li>
            <li className="list">Interfere with or disrupt the Services or servers.</li>
            <li className="list">Use the Services for any unauthorized commercial purpose.</li>
          </ol>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">6. Disclaimers</h6>
          <div className="text">
            The Services are provided "as is" and "as available" without warranty of any kind,
            express or implied. Optigrit disclaims all warranties, including, but not limited to,
            warranties of merchantability, fitness for a particular purpose, and non-infringement.
            Optigrit does not warrant that the Services will be uninterrupted, secure, or
            error-free. You use the Services at your own risk.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">7. Limitation of Liability</h6>
          <div className="text">
            Optigrit will not be liable for any damages arising out of or related to your use of the
            Services, including, but not limited to, direct, indirect, incidental, consequential, or
            punitive damages.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">8. Term and Termination</h6>
          <div className="text">
            These Terms will remain in effect until terminated by you or Optigrit. You may terminate
            these Terms at any time by discontinuing your use of the Services. Optigrit may
            terminate these Terms for any reason at any time by providing you with notice.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">9. Governing Law</h6>
          <div className="text">
            These Terms will be governed by and construed in accordance with the laws of India.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">10. Entire Agreement</h6>
          <div className="text">
            These Terms constitute the entire agreement between you and Optigrit regarding your use
            of the Services.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">11. Severability</h6>
          <div className="text">
            If any provision of these Terms is held to be invalid or unenforceable, such provision
            shall be struck and the remaining provisions shall remain in full force and effect.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">12. Waiver</h6>
          <div className="text">
            No waiver of any provision of these Terms shall be deemed a further or continuing waiver
            of such provision or any other provision.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">13. Updates to Terms</h6>
          <div className="text">
            Optigrit may update these Terms at any time. The updated Terms will be effective upon
            posting on the Platform. You are advised to review these Terms periodically for any
            changes.
          </div>
          <Divider color="white" sx={{ m: 4 }} />

          <h6 className="head6">14. Contact Us</h6>
          <div className="text">
            If you have any questions about these Terms, please contact us at support@optigrit.com .
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
