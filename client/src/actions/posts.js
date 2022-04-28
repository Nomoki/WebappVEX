import { FETCH_ALL, CREATE, UPDATE, DELETE, VIEW, EDIT } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const exploreView = (id, history) => async (dispatch) => {
  try {
     const { data } = await api.viewscene(id);

    dispatch({ type: VIEW, payload: data });

    history.push('/viewer');
  } catch (error) {
    console.log(error);
  }
};

export const createView = (id, history) => async (dispatch) => {
  try {
     const { data } = await api.editscene(id);

    dispatch({ type: EDIT, payload: data });

    history.push('/exhibition');
  } catch (error) {
    console.log(error);
  }
};