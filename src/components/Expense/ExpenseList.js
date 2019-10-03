import React from 'react';
import ExpenseItem from './ExpenseItem';
import { MdDeleteForever } from 'react-icons/md';

const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className='list'>
        {expenses.map(expense => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className='btn' onClick={clearItems}>
          Limpar Gastos <MdDeleteForever className='btn-icon' />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
