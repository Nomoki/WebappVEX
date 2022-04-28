import { FETCH_ALL, CREATE, UPDATE, DELETE, VIEW, EDIT } from '../constants/actionTypes';

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case VIEW:
      localStorage.setItem('That scene', JSON.stringify({ ...action?.payload }));

      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case EDIT:
      localStorage.setItem('That scene', JSON.stringify({ ...action?.payload }));

      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    default:
      return posts;
  }
};

