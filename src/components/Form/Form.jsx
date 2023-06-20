import PropTypes from 'prop-types';
import { Form, Label, Field, FormSubmit } from './Form.styled';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';


export const ContactForm = () => {
 const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const contactId = () => {
    return shortid.generate();
  };
 const handlSubmit = (values, actions) => {
    const isContact = contacts.some(
      ({ name }) => name.toLowerCase() === values.name.toLowerCase()
    );
    if (isContact) {
      actions.resetForm();
      return toast.error(`${values.name} is already in your contacts`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    const newContact = {
      id: contactId(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Form autoComplete="off" onSubmit={handlSubmit}>
      <Label>
        Name
        <Field
          value={name}
          placeholder="Enter a name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        
        />
      </Label>
      <Label>
        Number
        <Field
          value={number}
          placeholder="Enter a phone-number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
         
        />
      </Label>
      <FormSubmit type="submit">Add contact</FormSubmit>
    </Form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
