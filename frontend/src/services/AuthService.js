import axios from 'axios';

class AuthService {

  getHeaders() {
    return { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token')} };
  }

  async register({name, password, email}) {
    return await axios.post('http://127.0.0.1:8000/api/register', {name, password, email});
  }

  async login({email, password}) {
    return await axios.post('http://127.0.0.1:8000/api/login', {email, password});
  }
}

export default new AuthService();
