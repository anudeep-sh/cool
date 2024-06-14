import forbiddenError from './ForbiddenError';
import unAuthorizedError from './UnAuthorizedError';
import internalServerError from './InternalServerError';
import notFoundError from './NotFoundError';
import badRequestError from './BadRequestError';
import { HTTP_STATUS } from '../../utils/errorStatus';
import { eventEmitter } from '../../utils/eventEmitter';

const handleError = (error, reject) => {
  if (error.response?.data.status === HTTP_STATUS.UNAUTHORIZED) {
    unAuthorizedError();
  } else if (error.response?.data.status === HTTP_STATUS.FORBIDDEN) {
    forbiddenError();
  } else if (error.response?.data === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
    internalServerError();
  } else if (error.response?.data === HTTP_STATUS.NOT_FOUND) {
    reject(notFoundError(error.response?.data));
  } else if (
    error.response?.data.errorType === 'RestrictionError' &&
    error.response?.data?.code === 'FREE_ORGANIZATION_COUNT_LIMIT_EXCEEDED'
  ) {
    reject(eventEmitter.emit('showFreeOrgLimitRestrictionPopup'));
  } else if (
    error.response?.data.errorType === 'RestrictionError' &&
    error.response?.data?.code === 'ORGANIZATION_ALLOWED_STORAGE_LIMIT_EXCEEDED'
  ) {
    reject(eventEmitter.emit('showStorageLimitRestrictionPopup'));
  } else if (error.response?.data?.status === HTTP_STATUS.BAD_REQUEST) {
    reject(badRequestError(error.response?.data));
  } else if (
    error.response?.data.errorType === 'RestrictionError' &&
    error.response?.data?.code === 'ORGANIZATION_ALLOWED_CONTEST_LIMIT_EXCEEDED'
  ) {
    reject(eventEmitter.emit('showStorageLimitRestrictionPopup'));
  } else {
    reject({ message: error.response.data.reason });
  }
};

export default handleError;
