import { TRANS, TCREATE, TUPDATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getTransforms = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTransform();

    dispatch({ type: TRANS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTrans = (pos) => async (dispatch) => {
  try {
    const { data } = await api.createTrans(pos);

    dispatch({ type: TCREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTrans = (id, pos) => async (dispatch) => {
  try {
    const { data } = await api.updateTrans(id, pos);

    dispatch({ type: TUPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
