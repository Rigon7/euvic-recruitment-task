import { PeopleData } from '../../exampleData/exampleData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonData } from '../../interfaces/PersonDataInterface';

export interface PersonState {
    loading: boolean;
    persons: PersonData[];
}

const initialState: PersonState = {
    loading: false,
    persons: PeopleData
};

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        addPerson(state, action: PayloadAction<PersonData>) {
            state.persons.push(action.payload);
        },
        updatePerson(state, action: PayloadAction<PersonData>) {
            const index = state.persons.findIndex((person) => person.name === action.payload.name);
            if (index !== -1) {
                state.persons[index] = action.payload;
            }
        },
        deletePerson(state, action: PayloadAction<string>) {
            state.persons = state.persons.filter((person) => person.id !== action.payload);
        }
    }
});

export const { addPerson, updatePerson, deletePerson } = personSlice.actions;

export default personSlice.reducer;
