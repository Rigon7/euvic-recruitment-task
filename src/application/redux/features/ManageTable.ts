import { PeopleData } from '../../exampleData/exampleData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Person {
    name: string;
    age: number;
    birthDate: string;
    bio: string;
}

interface PersonState {
    loading: boolean;
    persons: Person[];
}

const initialState: PersonState = {
    loading: false,
    persons: PeopleData
};

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        addPerson(state, action: PayloadAction<Person>) {
            state.persons.push(action.payload);
        },
        updatePerson(state, action: PayloadAction<Person>) {
            const index = state.persons.findIndex((person) => person.name === action.payload.name);
            if (index !== -1) {
                state.persons[index] = action.payload;
            }
        },
        deletePerson(state, action: PayloadAction<string>) {
            state.persons = state.persons.filter((person) => person.name !== action.payload);
        }
    }
});

export const { addPerson, updatePerson, deletePerson } = personSlice.actions;

export default personSlice.reducer;
