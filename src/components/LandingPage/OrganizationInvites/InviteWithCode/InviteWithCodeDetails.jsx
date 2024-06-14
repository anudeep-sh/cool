import React, { useRef, useEffect, useState } from 'react';
import '../OrganizationInvites.css';
import CopyIcon from '../../../../assets/LandingPage/Org/copy-outline-icon.svg';
import { Tooltip } from '@mui/material';

export default function InviteWithCodeDetails({ Code }) {
  const codeRef = useRef(null);
  const [code, setCode] = useState(Code);
  const [copied, setCopied] = useState(false);

  // const getCode = () => {
  //   const storedCode = localStorage.getItem('code');
  //   setCode(storedCode ? storedCode : 'Code not found');
  // };

  // useEffect(() => {
  //   getCode();
  // }, []);

  const copyCodeToClipboard = () => {
    setCopied(true);
    const range = document.createRange();
    range.selectNode(codeRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  };

  return (
    <div className="InviteWithCodeDetailsCon">
      <div ref={codeRef} className="InviteWithCodeDetails-Code">
        {Code}
      </div>
      {code !== 'Code not found' && copied ? (
        <p>Copy</p>
      ) : (
        <Tooltip title="Copy">
          <img
            src={CopyIcon}
            alt="Copy"
            onClick={copyCodeToClipboard}
            style={{ cursor: 'pointer' }}
            width="20px"
          />
        </Tooltip>
      )}
    </div>
  );
}
