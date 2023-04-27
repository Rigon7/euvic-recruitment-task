import { configureStore } from '@reduxjs/toolkit';
import personReducer, { PersonState } from '../features/PersonReducer';

export interface StoreState {
    people: PersonState;
}

const store = configureStore({
    reducer: {
        people: personReducer
    }
});

export default store;
