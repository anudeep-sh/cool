import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Tooltip } from '@mui/material';
import handleFileUpload from '../../../../api/axios/fileUpload';
import axios from 'axios';

const IconFileUpload = (props) => {
  const handleUploadFile = async () => {
    if (props.file === null) return;
    props.setCancelLoading(true);
    const file = props.file;
    const reference = 'ORGANIZATION_DATA';
    const source = axios.CancelToken.source();
    props.setCancelToken(source);
    try {
      const url = await handleFileUpload(file, source.token, reference);
      props.setFileUrl(url);
      props.setCancelLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      props.setCancelLoading(false);
    }
  };

  return (
    <Tooltip title="Upload File">
      <FileUploadIcon onClick={handleUploadFile} sx={{ color: '#4db6ac', cursor: 'pointer' }} />
    </Tooltip>
  );
};

export default IconFileUpload;
