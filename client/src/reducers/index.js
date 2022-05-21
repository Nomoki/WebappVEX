import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import transforms from './transforms';
import transformsproduct from './transformsproduct';

export const reducers = combineReducers({ posts, auth, transforms, transformsproduct });