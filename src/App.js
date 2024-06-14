import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import './App.css';
import theme from './theme/Theme';
import ViewOrganizationPopup from './components/LandingPage/Org/ViewOrganizations';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Box } from '@mui/system';
import { Fab } from '@mui/material';
import { LazyComponent } from './components/LazyLoader';
import AlertPopUp from './components/Alert/AlertPopUp';
import SideBarResponsive from './components/SideBarResponsive';
import ProtectedRoute from './Routes/ProtechtedRoute';
import BigLoader from './components/Skeleton/BigLoader';
import ContactSupport from './pages/ContactSupport/ContactSupport';
import AboutUs from './components/LandingPage/AboutUs';
import OrganizationHomePage from './pages/LandingPage/Organization';
import OurProducts from './components/LandingPage/Products';
import Careers from './components/LandingPage/Careers';
import CourseUnderReview from './pages/Courses/CourseUnderReview';
import { getOrgData } from './organization';
import { OrganizationRoutes } from './Routes/OrganizationRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EmailInvite from './pages/Invite/EmailInvite';
import Plans from './components/LandingPage/PricingTab';
import StorageRestrictPopUp from './components/RestrictPopUp/index';
import TermsAndConditions from './components/LandingPage/TermsAndCondition';
import PrivacyPolicy from './components/LandingPage/PrivacyPolicy';
import FAQ from './components/LandingPage/FAQ';
import { ToastContainer } from 'react-toastify';
import RefundCancellation from './components/LandingPage/RefundCancellation';
import { fetchAllImages } from './utils/images';

const Home = LazyComponent(() => import('./pages/Courses/Home'));
const LandingPage = LazyComponent(() => import('./pages/LandingPage/Home'));
const UserProfile = LazyComponent(() => import('./pages/Contest/UserProfile2'));
const MyCourses = LazyComponent(() => import('./pages/Courses/MyCourses'));
const SignIn = LazyComponent(() => import('./pages/SignInSignUp/SignIn'));
const SignUp = LazyComponent(() => import('./pages/SignInSignUp/SignUp'));
const PageNotFound = LazyComponent(() => import('./pages/PageNotFound/PageNotFound'));
const VerifyUser = LazyComponent(() => import('./pages/SignInSignUp/Verifyuser'));
const UserWithoutLogin = LazyComponent(() => import('./pages/Courses/UserWithoutLogin'));
const ForgotPassword = LazyComponent(() => import('./pages/ForgotPassword/ForgotPasswordEmail'));
const ResetPassword = LazyComponent(() => import('./pages/ForgotPassword/ConfirmPassword'));
const SessionTimedOut = LazyComponent(() => import('./pages/SessionTimedOut/SessionTimedOut'));
const CheckOut = LazyComponent(() => import('./pages/Courses/CheckOut'));
const InternalServerError = LazyComponent(() =>
  import('./pages/InternalServerError/InternalServerError')
);

function App() {
  const [isSubDomainOrganization, setisSubDomainOrganization] = useState(false);
  const [selectedOrgName, setSelectedOrgName] = useState(null);
  const [orgImageStatus, setorgImageStatus] = useState("")

  const getDomainData = async () => {
    const data = await getOrgData();
    if (data) {
      setisSubDomainOrganization(true);
    }
  };

  useEffect(() => {
    getDomainData();
    return () => { };
  }, []);

  useEffect(() => {
    (async () => {
      await fetchAllImages();
    })();
  });

  const Layout = () => {
    return (
      <>
        <SideBarResponsive setSelectedOrgName={setSelectedOrgName} orgImageStatus={orgImageStatus} setorgImageStatus={setorgImageStatus} />
        {selectedOrgName && (
          <ViewOrganizationPopup
            selectedOrgName={selectedOrgName}
            setSelectedOrgName={setSelectedOrgName}
          />
        )}
        {<StorageRestrictPopUp />}
        <Outlet />
      </>
    );
  };
  const clientId = process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Box
              sx={{
                flexGrow: 1,
                width: { lg: `calc(100%)` },
                minWidth: { lg: '978px' },
                margin: 'auto!important',
                maxWidth: { xl: '1640px' },
              }}
            >
              {/* <Box>
                <Fab
                  variant="extended"
                  size={'medium'}
                  color="primary"
                  aria-label="add"
                  sx={{
                    p: 2,
                    position: 'fixed',
                    bottom: { xs: '48px', sm: '24px' },
                    right: { xs: '16px', sm: '24px' },
                    zIndex: 1200,
                  }}
                  onClick={() => (window.location.href = '/contact-support')}
                >
                  Report a Bug
                </Fab>
              </Box> */}
              {/* <Dialogue
                opendia={openDialog}
                setOpendia={setOpenDialog}
                title={'Report a Bug'}
                children={<ReportABug setOpendia={setOpenDialog} />}
                maxWidth="500px"
              /> */}
              <AlertPopUp />
              <>
                <ToastContainer />
                <React.Suspense fallback={<BigLoader />}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route element={<ProtectedRoute />}>
                      <Route path="/organization" element={<OrganizationHomePage />} />
                      <Route path="/" element={<Layout />}>
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/my-courses" element={<MyCourses />} />
                        <Route path="/org/:orgName/*" element={<OrganizationRoutes orgImageStatus={orgImageStatus} setorgImageStatus={setorgImageStatus} />} />
                        {/* <Route path="admin/*" element={<AdminRoutes />} /> */}
                        {/* <Route path="problem/*" element={<ProblemRoutes />} /> */}
                      </Route>
                    </Route>
                    <Route path="/sign-in" element={<SignIn />} />
                    {isSubDomainOrganization ? (
                      <Route path="/sign-up" element={<PageNotFound />} />
                    ) : (
                      <Route path="/sign-up" element={<SignUp />} />
                    )}
                    <Route path="/user-without-login" element={<UserWithoutLogin />} /> "//needs
                    attention"
                    <Route path="/contact-support" element={<ContactSupport />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/our-products" element={<OurProducts />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/resetpassword/:id" element={<ResetPassword />} />
                    <Route path="/verifyuser/:id" element={<VerifyUser />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/session-expired" element={<SessionTimedOut />} />
                    <Route path="/internal-server-error" element={<InternalServerError />} />
                    <Route path="/terms&conditions" element={<TermsAndConditions />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/refund-cancellation" element={<RefundCancellation />} />
                    <Route
                      path="/email/invite/:inviteId"
                      element={<EmailInvite setSelectedOrgName={setSelectedOrgName} />}
                    />
                    <Route path="/contact-support" element={<ContactSupport />} />
                    <Route path="/under-review" element={<CourseUnderReview />} />
                    <Route path="/checkout" element={<CheckOut />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </React.Suspense>
              </>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
