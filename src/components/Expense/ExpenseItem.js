import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  const { id, charge, amount } = expense;
  return (
    <li className='item'>
      <div className='info'>
        <span className='expense'>{charge}</span>
        <span className='expense'>R$ {amount}</span>
      </div>
      <div>
        <button
          className='edit-btn'
          onClick={() => handleEdit(id)}
          aria-label='edit button'
        >
          <MdEdit />
        </button>
        <button
          className='clear-btn'
          onClick={() => handleDelete(id)}
          aria-label='clear button'
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
