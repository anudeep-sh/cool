import performRequest from '../../axios';

export const plansAPI = {
  getPlans: async () => {
    return await performRequest(`plans`, 'GET');
  },
  getPublicPlans: async () => {
    return await performRequest(`public/plans`, 'GET');
  },
  getPriceForOrderedPlan: async (planId, months, promocode) => {
    return await performRequest(`promocode/${planId}/${months}/${promocode}`, 'GET');
  },
  PlansPayment: async (data) => {
    return await performRequest(`payment/paytm/plans`, 'POST', data);
  },
};
