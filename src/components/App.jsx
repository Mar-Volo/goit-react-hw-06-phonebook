import { useState, useEffect } from 'react';
import shortid from 'shortid';

import { ContactForm } from './Form/Form';
import { ContactsList } from './Contacts/Contacts';
import { Title } from './Layout/Layout.styled';
import { Filter } from './Filter/Filter';

import GlobalStyle from 'GlobalStyle';
import { Layout } from './Layout/Layout';

const getSavedContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  return savedContacts ? JSON.parse(savedContacts) : [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getSavedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactId = () => {
    return shortid.generate();
  };

  const onAddContact = data => {
    console.log(data);
    const searchName = contacts
      .map(contact => contact.name)
      .includes(data.name);
    const searchNumber = contacts
      .map(contact => contact.number)
      .includes(data.number);
    if (searchName) {
      alert(`${data.name} is already in contacts`);
    } else if (searchNumber) {
      alert(`${data.number} is already in contacts`);
    } else {
      const contact = {
        ...data,
        id: contactId(),
      };
      setContacts(prevContacts => [...prevContacts, contact]);
    }
  };

  const filterHandler = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onDelete = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();
  console.log(visibleContacts);
  return (
    <Layout>
      <Title>Phonebook</Title>
      <ContactForm addContact={onAddContact} />
      <Title>Contacts</Title>

      <Filter value={filter} searchContact={filterHandler} />

      <ContactsList
        filterContacts={visibleContacts}
        onDeleteContact={onDelete}
      />

      <GlobalStyle />
    </Layout>
  );
};
