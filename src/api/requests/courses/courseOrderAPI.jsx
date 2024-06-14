import performRequest from '../../axios';

export const courseOrderAPI = {
  getPromoCode: async (coupon) => {
    return await performRequest(`promocode/${coupon}`, 'GET');
  },
};
