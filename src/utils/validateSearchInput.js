export const validateSearchInput = (input) => {
  const isInvalid = /^[, ]+$/.test(input) || input === '';
  if (isInvalid) {
    return '';
  }
  if (input.includes(',') || input.includes(' ')) {
    return input
      .split(/[ ,]+/)
      .map((element) => element.trim())
      .filter((element) => element.length > 0);
  }
  return [input];
};
