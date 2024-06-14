import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function MediaMessageBox({ message }) {
  const [fileExtension, setFileExtension] = useState('');

  useEffect(() => {
    const extension = getFileExtension(message.url);
    setFileExtension(extension);
  }, [message.url]);

  const getFileExtension = (url) => {
    if (url) {
      return url.substring(url.lastIndexOf('.') + 1);
    }
  };

  const isPDF = (extension) => {
    if (extension) {
      return extension.toLowerCase() === 'pdf';
    }
  };

  const isImage = (extension) => {
    if (extension) {
      return ['jpg', 'jpeg', 'png', 'gif'].includes(extension.toLowerCase());
    }
  };

  const renderMedia = () => {
    if (isPDF(fileExtension)) {
      return <PictureAsPdfIcon />;
    } else if (isImage(fileExtension)) {
      return (
        <img src={message.url} alt={message.message} style={{ maxWidth: '100%', height: 'auto' }} />
      );
    } else {
      return <FilePresentIcon />;
    }
  };

  return (
    <Link
      color={'inherit'}
      href={message.url}
      download
      sx={{
        display: 'flex',
        flexDirection: isImage(fileExtension) ? 'column' : 'row',
        alignItems: 'center',
        gap: {
          xs: '4px',
          sm: '8px',
        },
        textDecoration: 'none',
        height: 'fit-content',
      }}
    >
      {renderMedia()}
      <p
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: isImage(fileExtension) ? 'end' : 'center',
        }}
      >
        {message.message}
        <DownloadIcon />
      </p>
    </Link>
  );
}
