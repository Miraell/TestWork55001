import axios from 'axios';
import AuthService from './AuthService.js';

const BASE_URL = 'http://127.0.0.1:8000';

class JobPostingsService {

  async findAll() {
    return await axios.get(`${BASE_URL}/api/job-postings`, AuthService.getHeaders());
  }

  async findById(id) {
    return await axios.get(`${BASE_URL}/api/job-postings/${id}`, AuthService.getHeaders());
  }

  async create({title, company, salary, description}) {
    return await axios.post(`${BASE_URL}/api/job-postings`, {title, company, salary, description}, AuthService.getHeaders());
  }

  async update(data) {
    return await axios.put(`${BASE_URL}/api/job-postings/${data.id}`, data, AuthService.getHeaders());
  }

  async delete(id) {
    return await axios.delete(`${BASE_URL}/api/job-postings/${id}`, AuthService.getHeaders());
  }

}

export default new JobPostingsService();
