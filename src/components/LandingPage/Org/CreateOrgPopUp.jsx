import React, { useState, useEffect, useRef } from 'react';
import CreateBtnIcon from '../../../assets/LandingPage/Org/createOrgBtn.svg';
import AttachFileIcon from '../../../assets/LandingPage/Org/attachFileIcon.svg';
import './CreateOrgPopUp.css';
import { organizationAPI } from '../../../api/requests/organization/organizationAPI';

import { handleAlert } from '../../../utils/handleAlert';
import { useNavigate } from 'react-router-dom';
import handleFileUpload from '../../../api/axios/fileUpload';
import { Button } from '@mui/material';
import axios from 'axios';

export default function CreateOrgPopUp({ onClose, withSideBar }) {
  const [orgName, setOrgName] = useState('');
  const [orgLogo, setOrgLogo] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const [orgNameError, setOrgNameError] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const hiddenInputBtn = useRef(null);
  
  const popupRef = useRef();
  const navigate = useNavigate();

  const handleThumbnailUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      setCancelLoading(true);
      setOrgLogo(event.target.files[0]);
      const reference = 'ORGANIZATION_DATA';
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const url = await handleFileUpload(event.target.files[0], source.token, reference);
      if (url) {
        setImageUrl(url);
      }
      setCancelLoading(false);
      handleAlert('Image has been uploaded', 'success');
    }
  };
  const handleCancelUpload = (event) => {
    event.preventDefault();
    if (cancelToken) {
      cancelToken.cancel('Upload cancelled by the user');
    }
  };

  const handleCreateOrg = async () => {
    if (orgName.trim() !== '') {
      try {
        let logoLink = '';
        if (orgLogo) {
          logoLink = imageUrl;
        }
        const data = {
          name: orgName,
          description: orgDescription,
          logoLink: logoLink,
        };
        organizationAPI
          .addOrganization(data)
          .then((res) => {
            if (res.code === 'FREE_ORGANIZATION_COUNT_LIMIT_EXCEEDED') {
              return;
            }
            localStorage.setItem('orgName', orgName);
            navigate(`/org/${orgName}/dashboard`);
          })
          .catch(() => {
            // handleAlert('Something went wrong! please try again later', 'error');
          })
          .finally(() => {
            onClose();
          });
      } catch (error) {
        console.error('Error creating organization:', error);
      }
    } else {
      setOrgNameError('* Organization name is mandatory');
    }
  };

  function validateName(e) {
    if (e.length === 0) {
      setOrgName(e);
      return;
    }
    setOrgNameError('');
    var re = new RegExp('^[a-zA-z_]+$');
    if (re.test(e)) {
      setOrgName(e);
    } else {
      setOrgNameError('Capital and small letters, along with underscores, are allowed');
    }
  }

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.classList.add('CreateOrgPopup-open');
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.classList.remove('CreateOrgPopup-open');
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="CreateOrgPopup">
      <div
        className={withSideBar ? 'CreateOrgPopup-main-SideBar' : 'CreateOrgPopup-main'}
        ref={popupRef}
      >
        <button className="CreateOrgClose-btn" onClick={onClose}>
          &times;
        </button>
        <div className="CreateOrgClosePopup-content">
          <p className="CreateOrgClosePopup-Heading">Create your organization</p>
          <p className="CreateOrgClosePopup-SubHeading">
            Engage in close collaboration with a group of individuals within your organization who
            share a team, course or mutual interest.
          </p>
          <div>
            <div className="CreateOrgClosePopup-secondHalf-First">
              <div>
                <p className="CreateOrgClosePopup-iputHeading">Name*</p>
                <input
                  type="text"
                  placeholder="Enter organization name"
                  className="CreateOrgClosePopup-placeholder3"
                  onChange={(e) => validateName(e.target.value)}
                />
                {orgNameError && <p className="CreateOrgError-text">{orgNameError}</p>}
              </div>
              <div>
                <p className="CreateOrgClosePopup-iputHeading">Logo</p>
                <div
                  className="CreateOrgPopup-logoUploadButton"
                  onClick={() => hiddenInputBtn.current.click()}
                >
                  <input
                    type="file"
                    placeholder="Attach File here"
                    ref={hiddenInputBtn}
                    onChange={(e) => handleThumbnailUpload(e)}
                    style={{ display: 'none' }}
                  />
                  <p className="UploadFileName">{orgLogo ? orgLogo.name : 'No file choosen'}</p>
                  {cancelLoading ? (
                    <Button
                      variant="outlined"
                      style={{ marginLeft: '4px', border: 'none', paddingRight: '0' }}
                      onClick={handleCancelUpload}
                    >
                      Cancel Upload
                    </Button>
                  ) : (
                    <>
                      <img src={AttachFileIcon} alt="" className="CreateOrgAttach-file-icon" />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <p className="CreateOrgClosePopup-iputHeading">Description</p>
              <textarea
                type="text"
                placeholder="Enter Organization description to let people know about it"
                className="CreateOrgClosePopup-placeholder2"
                onChange={(e) => setOrgDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="CreateOrgClosePopup-createBtnCont">
            <button className="CreateOrgClosePopup-createBtn" onClick={handleCreateOrg}>
              Create
              <img src={CreateBtnIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
