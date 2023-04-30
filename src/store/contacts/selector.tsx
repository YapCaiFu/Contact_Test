import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const contactsSelector = (state: RootState) => state.contacts.contact;

export const selectedContactsSelector = (id: string) => createSelector(contactsSelector, (contacts) => {
    return contacts.find(contact => contact.id === id);
});

