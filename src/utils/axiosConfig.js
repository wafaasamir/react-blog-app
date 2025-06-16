import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const login = async (email, password) => {
  try {
 
    const response = await api.get(`/users?email=${email}`);
    console.log('Login response:', response.data); 
    
    const user = response.data[0];
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    
    const userResponse = await api.get(`/users/${user.id}`);
    const completeUser = userResponse.data;
    console.log('Complete user data:', completeUser); 
    
   
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      id: completeUser.id, 
      email: completeUser.email,
      name: completeUser.name ,
    }));
    const signature = btoa('dummy-signature'); 
    const token = `${header}.${payload}.${signature}`;
    
    console.log('Created token with payload:', JSON.parse(atob(payload))); 
    localStorage.setItem('token', token);
    return { user: completeUser, token };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    
    const response = await api.get(`/users?email=${userData.email}`);
    if (response.data.length > 0) {
      throw new Error('Email already exists');
    }
    
   
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
  
    const savedUser = await api.post('/users', newUser);
    console.log('User registered:', savedUser.data); 
   
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      id: newUser.id, 
      email: newUser.email,
      name: newUser.name
    }));
    const signature = btoa('dummy-signature');
    const token = `${header}.${payload}.${signature}`;
    
    console.log('Created token with payload:', JSON.parse(atob(payload))); 
    return { user: newUser, token };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export default api; 