import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from './Layout/Layout';
import { Title } from './Layout/Layout.styled';
import { ContactForm } from './Form/Form';
import { Fillter } from './fillter/Fillter';
import { ContactsList } from './Contacts/Contacts';

export const App = () => {
  return (
    <Layout>
      <Title>Phonebook</Title>
      <ContactForm />
      <Title>Contacts</Title>
      <Fillter />
      <ContactsList />
      <ToastContainer />
      <GlobalStyle />
    </Layout>
  );
};
