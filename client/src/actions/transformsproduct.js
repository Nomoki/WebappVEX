import { TRANSPROD, TCREATEPROD, TUPDATEPROD } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getTransformsProd = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTransformProduct();

    dispatch({ type: TRANSPROD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTransProd = (pos) => async (dispatch) => {
  try {
    const { data } = await api.createTransProduct(pos);

    dispatch({ type: TCREATEPROD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTransProd = (id, pos) => async (dispatch) => {
  try {
    const { data } = await api.updateTransProduct(id, pos);

    dispatch({ type: TUPDATEPROD, payload: data });
  } catch (error) {
    console.log(error);
  }
};
