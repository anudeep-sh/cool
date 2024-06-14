import axios from 'axios';
import { getOrgName } from '../../utils/appendOrgQuery';
import { eventEmitter } from '../../utils/eventEmitter';

const handleFileUpload = async (file, cancelToken, reference) => {
  try {
    const extension = file?.name.split('.').pop();
    const organization = getOrgName();
    const formData = new FormData();
    formData.append('file', file);
    const Token = localStorage.getItem('Token');

    const response = await axios.post(
      `${process.env.REACT_APP_URL}upload/${extension}?reference=${reference}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
          organization,
          Authorization: `Bearer ${Token}`,
        },
        cancelToken: cancelToken,
      }
    );
    return response?.data?.publicUrl;
  } catch (error) {
    if (axios.isCancel(error)) {
      return null;
    } else {
      if (error?.response?.data?.errorType === 'RestrictionError') {
        eventEmitter.emit('showStorageLimitRestrictionPopup');
      }
    }
    return null;
  }
};

export default handleFileUpload;
