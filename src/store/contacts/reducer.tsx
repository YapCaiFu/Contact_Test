import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialData from 'data/data.json'

interface ContactState {
    contact: Contact[];
}

const initialState: ContactState = {
    contact: initialData,
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            const { id, email, firstName, lastName, phone } = action.payload
            let existContact = state.contact.find(val => val.id === id)
            if (existContact) {
                existContact.email = email;
                existContact.firstName = firstName;
                existContact.lastName = lastName;
                existContact.phone = phone;
            } else {
                state.contact.push({ ...action.payload });
            }
        },
        deleteContact: (state, action: PayloadAction<string[]>) => {
            state.contact = state.contact.filter(val => !action.payload.includes(val.id));
        },
        refreshContact: (state) => {
            state.contact = [...initialData]
        },
    },
});

export const { addContact, deleteContact, refreshContact } = contactsSlice.actions;

export default contactsSlice.reducer;
