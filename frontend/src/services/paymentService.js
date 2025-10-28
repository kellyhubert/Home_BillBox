import api from './api';

export const paymentService = {
  async initiatePayment(paymentData) {
    const response = await api.post('/payments/initiate', paymentData);
    return response.data;
  },

  async getPaymentHistory() {
    const response = await api.get('/payments/history');
    return response.data;
  },

  async getPaymentById(id) {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  },

  async verifyPayment(transactionId) {
    const response = await api.post('/payments/verify', { transactionId });
    return response.data;
  }
};