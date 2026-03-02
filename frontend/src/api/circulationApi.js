import axiosInstance from './axiosInstance';
export const checkout = (data) => axiosInstance.post('circulation/checkout/', data);
export const checkIn = (data) => axiosInstance.post('circulation/checkin/', data);
export const fetchOverdue = () => axiosInstance.get('circulation/overdue/');
export const fetchTransactions = (params) => axiosInstance.get('circulation/transactions/', { params });
