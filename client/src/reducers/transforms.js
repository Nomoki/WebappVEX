import { TRANS, TCREATE, TUPDATE } from '../constants/actionTypes';

export default (transforms = [], action) => {
  switch (action.type) {
    case TRANS:
      return action.payload;
    case TCREATE:
      return [...transforms, action.payload];
    case TUPDATE:
      return transforms.map((pos) => (pos._id === action.payload._id ? action.payload : pos));
    default:
      return transforms;
  }
};