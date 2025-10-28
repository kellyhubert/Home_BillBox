import api from './api';

export const billService = {
  async getAllBills() {
    const response = await api.get('/bills');
    return response.data;
  },

  async getBillById(id) {
    const response = await api.get(`/bills/${id}`);
    return response.data;
  },

  async createBill(billData) {
    const response = await api.post('/bills', billData);
    return response.data;
  },

  async updateBill(id, billData) {
    const response = await api.put(`/bills/${id}`, billData);
    return response.data;
  },

  async deleteBill(id) {
    const response = await api.delete(`/bills/${id}`);
    return response.data;
  }
};
