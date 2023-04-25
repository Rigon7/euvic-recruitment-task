import { configureStore } from '@reduxjs/toolkit';
import personsReducer, { PersonState } from '../features/PersonReducer';

export interface StoreState {
    people: PersonState;
}

const store = configureStore({
    reducer: {
        people: personsReducer
    }
});

export default store;
