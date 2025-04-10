import axios from 'axios';

const getToken = () => localStorage.getItem('token');  // latest token every time


const API_BASE_URL = 'http://54.84.234.27:3000/api';

const apiService = {
  search: async (collectionName, body = {}) => {
    const res = await axios.post(`${API_BASE_URL}/${collectionName}/search`, body, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
  },

  insert: async (collectionName, body = {}) => {
    const res = await axios.post(`${API_BASE_URL}/${collectionName}`, body, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
  },

  batchinsert: async (collectionName, body = {}) => {
    const res = await axios.post(`${API_BASE_URL}/${collectionName}/batchinsert`, body, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
  },

  update: async (collectionName, id, body = {}) => {
    const res = await axios.put(`${API_BASE_URL}/${collectionName}/${id}`, body, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
  },

  delete: async (collectionName, id) => {
    const res = await axios.delete(`${API_BASE_URL}/${collectionName}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
  },

  login: async (values) => {
    const res = await axios.post(`${API_BASE_URL}/login`, values);
    return res.data;
  }
};

export default apiService;
