import { Typography } from '@mui/material';
import { useState } from 'react';

const ReadMore = ({ children, fontSize, color }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Typography
      sx={{
        display: 'inline',
        width: '100%',
        fontSize: fontSize,
        color: color,
      }}
    >
      {text.length > 70 ? (
        <>
          {isReadMore ? `${text.slice(0, 70)}... ` : text}
          <span onClick={toggleReadMore} style={{ color: '#698AFF', cursor: 'pointer' }}>
            {isReadMore ? 'Read More' : ' Show Less'}
          </span>
        </>
      ) : (
        text
      )}
    </Typography>
  );
};

export default ReadMore;
