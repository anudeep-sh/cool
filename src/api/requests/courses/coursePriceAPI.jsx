import performRequest from '../../axios';

export const coursePriceAPI = {
  getCoursePrices: async () => {
    return await performRequest(`price`, 'GET');
  },
};
