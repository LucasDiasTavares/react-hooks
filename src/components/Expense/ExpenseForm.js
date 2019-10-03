import React from 'react';
import { MdSend } from 'react-icons/md';

const ExpenseForm = ({
  charge,
  amount,
  handleAmount,
  handleCharge,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>Nome</label>
          <input
            type='text'
            className='form-control'
            id='charge'
            name='charge'
            placeholder='EX: Carro'
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='amount'>Valor</label>
          <input
            type='number'
            className='form-control'
            id='amount'
            name='amount'
            placeholder='EX: 159'
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type='submit' className='btn'>
        Salvar
        <MdSend className='btn-icon' />
      </button>
    </form>
  );
};

export default ExpenseForm;
