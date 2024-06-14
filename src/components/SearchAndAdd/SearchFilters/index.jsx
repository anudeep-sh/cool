// import userData from "./DummyData/userData";
import courseData from './DummyData/courseData';
import contestData from './DummyData/contestData';
import filterItem from './FilterItem';

const filteredData = (itemType, value, taskUsersData) => {
  const data =
    itemType === 'users' ? taskUsersData : itemType === 'courses' ? courseData : contestData;

  return data.filter((result) => value && result && filterItem(itemType, value, result));
};

export default filteredData;
