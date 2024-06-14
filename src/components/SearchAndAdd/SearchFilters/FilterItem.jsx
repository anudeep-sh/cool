const filterItem = (itemType, value, result) => {
  if (itemType === 'users')
    return (
      result.firstName &&
      (result.firstName.toLowerCase().includes(value) ||
        result.lastName.toLowerCase().includes(value) ||
        result.username.toLowerCase().includes(value))
    );
  else return result.title && result.title.toLowerCase().includes(value);
};

export default filterItem;
