import axios from 'axios';

const API = axios.create({ baseURL: 'https://web-app-vex.herokuapp.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const viewscene = (id) => API.get(`/posts/${id}`);
export const editscene = (id) => API.get(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchTransform = () => API.get('/pos');
export const createTrans = (newPosition) => API.post('/pos', newPosition);
export const updateTrans = (id, updatedPosition) => API.patch(`/pos/${id}`, updatedPosition);

export const fetchTransformProduct = () => API.get('/posprod');
export const createTransProduct = (newPosition) => API.post('/posprod', newPosition);
export const updateTransProduct = (id, updatedPosition) => API.patch(`/posprod/${id}`, updatedPosition);

export const stockscene = (id) => API.get(`/posts/${id}`);
export const cartscene = (id) => API.get(`/posts/${id}`);
export const cartproduct = (id) => API.get(`/posprod/${id}`);