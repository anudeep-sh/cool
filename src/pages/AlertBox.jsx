
import { manipulateuserdata } from '../Redux/UserData/User-Action';
import { SET_ALERT_DATA } from '../Redux/UserData/User-Constants';
import { handleAlert } from '../utils/handleAlert';

export const AlertBox = (message, type) => {
  

  return handleAlert(message, type);
};
