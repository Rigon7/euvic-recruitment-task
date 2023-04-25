import { configureStore } from '@reduxjs/toolkit';
import personsReducer from '../features/ManageTable';
const store = configureStore({
    reducer: {
        people: personsReducer
    }
});

export default store;
