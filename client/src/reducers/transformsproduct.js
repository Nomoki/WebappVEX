import { TRANSPROD, TCREATEPROD, TUPDATEPROD } from '../constants/actionTypes';

export default (transformsproduct = [], action) => {
  switch (action.type) {
    case TRANSPROD:
      return action.payload;
    case TCREATEPROD:
      return [...transformsproduct, action.payload];
    case TUPDATEPROD:
      return transformsproduct.map((pos) => (pos._id === action.payload._id ? action.payload : pos));
    default:
      return transformsproduct;
  }
};