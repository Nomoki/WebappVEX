import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import transforms from './transforms';

export const reducers = combineReducers({ posts, auth, transforms });