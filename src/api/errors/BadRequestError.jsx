const badRequestError = (data) => {
  return { message: data.reason };
};

export default badRequestError;
