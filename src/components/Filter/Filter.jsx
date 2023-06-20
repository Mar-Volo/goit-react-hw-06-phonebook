import { useDispatch } from 'react-redux';
import { filterContact } from '../../redux/filterSlice';
import { FilterContact } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();

  const searchContact = ({ target: { value } }) => {
    dispatch(filterContact(value));
  };
  return (
    <div>
      <p>Find contacts by name</p> <br />
      <FilterContact
        type="text"
        value={value}
        name="filter"
        placeholder="Search contact"
        onChange={searchContact}
      />
    </div>
  );
};

