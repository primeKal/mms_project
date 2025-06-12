import baseAPI from "../base";

export const kitchenService = {
  getAllKitchens: async (page = 1, pageSize = 10) => {
    console.log('getAllKitchens', page, pageSize);
    const response = await baseAPI.get(`/kitchen?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },

  createKitchen: async (kitchenData) => {
    const response = await baseAPI.post('/kitchen', kitchenData);
    return response.data;
  },

  addItemsToKitchen: async (kitchenId, items) => {
    const response = await baseAPI.post(`/kitchen/${kitchenId}/items`, { items });
    return response.data;
  },

  getKitchenItems: async (kitchenId) => {
    const response = await baseAPI.get(`/kitchen/${kitchenId}/items`);
    return response.data;
  },

  getPendingRequests: async (page = 1, pageSize = 10) => {
    const response = await baseAPI.get(`/kitchen/requests/pending?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },

  approveRequest: async (requestId) => {
    const response = await baseAPI.post(`/kitchen/requests/${requestId}/approve`);
    return response.data;
  },

  disapproveRequest: async (requestId) => {
    const response = await baseAPI.post(`/kitchen/requests/${requestId}/disapprove`);
    return response.data;
  }
}; 