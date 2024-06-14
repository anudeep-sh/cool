import { Typography } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useRef } from 'react';

const DropBox = (props) => {
  const ref = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const newFile = e.target.files[0];
    props.setFile(newFile);
    props.setFileProgress(null);
  };

  const handleDragEnter = () => {
    ref.current.style.backgroundColor = '#F0F3FF';
    ref.current.style.borderColor = '#698aff';
  };
  const handleDropAndLeave = () => {
    ref.current.style.backgroundColor = '#fff';
    ref.current.style.borderColor = '#bdbdbd';
  };

  return (
    <form
      ref={ref}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDropAndLeave}
      onDrop={handleDropAndLeave}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '200px',
        width: '100%',
        border: '2px dashed #bdbdbd',
        borderRadius: '10px',
        position: 'relative',
        padding: '16px',
      }}
    >
      <CloudUploadOutlinedIcon sx={{ color: '#698aff', opacity: '50%', fontSize: '5rem' }} />
      <Typography sx={{ color: 'grey', textAlign: 'center' }} variant="body2">
        Drag and Drop file here or Click to Browse
      </Typography>

      <input
        onChange={handleDrop}
        style={{
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          cursor: 'pointer',
        }}
        type="file"
      ></input>
    </form>
  );
};

export default DropBox;
