import React, { useState, useEffect } from 'react';
import card1 from '../../../assets/LandingPage/Org/profiles.svg';
import OrgCreateBtnIcon from '../../../assets/LandingPage/Org/createIcon.svg';
import OrgJoinBtnIcon from '../../../assets/LandingPage/Org/joinIcon.svg';
import OrgViewBtnIcon from '../../../assets/LandingPage/Org/viewIcon.svg';
import './OrganizationsPage.css';
import CreateOrgPopUp from './CreateOrgPopUp';
import SuggestedOrganizations from './SuggestedOrganizations';
import JoinOrgPopUp from './JoinOrgPopup';
import GetValidatedTokenData from '../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import OrgListComponent from './OrgListComponent';
import { Backdrop, CircularProgress } from '@mui/material';

export default function OrganizationPage() {
  const navigate = useNavigate();

  const [orgCodeEntered, setOrgCodeEntered] = useState('');
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [joinBtnClickedWithoutCode, setJoinBtnClickedWithoutCode] = useState(false);
  const [isCreateOrgPopupVisible, setCreateOrgPopupVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const openCreateOrgPopup = () => {
    if (signedIn) {
      setCreateOrgPopupVisible(true);
    } else {
      navigate('/sign-in');
    }
  };

  const closeCreateOrgPopup = () => {
    setCreateOrgPopupVisible(false);
  };
  const [isViewOrgPopupVisible, setViewOrgPopupVisible] = useState(false);

  const openViewOrgPopup = () => {
    if (signedIn) {
      setViewOrgPopupVisible(true);
    } else {
      navigate('/sign-in');
    }
  };

  const closeViewOrgPopUp = () => {
    setViewOrgPopupVisible(false);
  };
  const [isJoinOrgPopupVisible, setJoinOrgPopupVisible] = useState(false);

  const openJoinOrgPopup = () => {
    if (signedIn) {
      if (isCodeEntered) {
        setJoinOrgPopupVisible(true);
        setJoinBtnClickedWithoutCode(false);
      } else {
        setJoinBtnClickedWithoutCode(true);
      }
    } else {
      navigate('/sign-in');
    }
  };

  const closeJoinOrgPopup = () => {
    setJoinOrgPopupVisible(false);
  };
  const handleCodeInputChange = (e) => {
    const codeEntered = e.target.value;
    setOrgCodeEntered(codeEntered);
    setIsCodeEntered(!!codeEntered.trim());
    setJoinBtnClickedWithoutCode(false);
  };
  const [signedIn, setSignedIn] = useState(false);

  const checkToken = () => {
    const { isLoggedIn } = GetValidatedTokenData();

    if (isLoggedIn) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <div className="OrgHeroCon">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => setOpen(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="orgCardSecCon">
        <div className="orgCardOne">
          <div className="orgCardHead">Form your organization</div>
          <div>
            <img src={card1} alt="" />
          </div>
          <div className="orgCardSubHead">
            Bring everyone together and launch into productivity.
          </div>
          <div className="orgCardBtn">
            <button className="OrgCreateBtn" onClick={openCreateOrgPopup}>
              Create Org
              <img src={OrgCreateBtnIcon} alt="" />
            </button>
            {isCreateOrgPopupVisible && <CreateOrgPopUp onClose={closeCreateOrgPopup} />}
          </div>
        </div>
        <div className="orgCardOne">
          <div className="orgCardHead">Join an organization</div>
          <div className="orgCodeInputDiv">
            <input
              className="orgInput"
              type="text"
              placeholder="Enter code here"
              onChange={handleCodeInputChange}
            />
            {joinBtnClickedWithoutCode && (
              <p className="joinErrorMessage">*Enter the code to join</p>
            )}
          </div>

          <div className="orgCardSubHead">Input a code to become a part of the organization.</div>
          <div className="orgCardBtn">
            <button className="OrgJoinBtn" onClick={openJoinOrgPopup}>
              Join Org
              <img src={OrgJoinBtnIcon} alt="" />
            </button>
            {isJoinOrgPopupVisible && (
              <JoinOrgPopUp onClose={closeJoinOrgPopup} code={orgCodeEntered} />
            )}
            <button className="OrgViewBtn" onClick={openViewOrgPopup}>
              View Orgs
              <img src={OrgViewBtnIcon} alt="" />
            </button>
            {isViewOrgPopupVisible && <SuggestedOrganizations onClose={closeViewOrgPopUp} />}
          </div>
        </div>
      </div>
      <div className="componentCard">
        <OrgListComponent Align={'column'} setOpen={setOpen} />
      </div>
    </div>
  );
}
