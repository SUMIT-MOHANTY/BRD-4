import api from './axiosInstance'

export const fetchMembers = (params) => api.get('/api/v1/members/', {params});
export const fetchMember = (id) => api.get(`/api/v1/members/${id}/`);
export const createMember = (data) => api.post('/api/v1/members/', data);
export const updateMember = (id, data) => api.put(`/api/v1/members/${id}/`, data);
export const deleteMember = (id) => api.delete(`/api/v1/members/${id}/`);
