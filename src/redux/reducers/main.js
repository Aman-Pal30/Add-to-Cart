import { combineReducers } from '@reduxjs/toolkit';
import { cartreducer } from './reducer';

const rootred = combineReducers({
    cart: cartreducer,
});

export default rootred;
