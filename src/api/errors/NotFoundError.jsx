const notFoundError = (data) => {
  return { message: data.reason };
};

export default notFoundError;
