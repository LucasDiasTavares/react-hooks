import React, { useState } from 'react';
import './App.css';

import ExpenseForm from './components/Expense/ExpenseForm';
import ExpenseList from './components/Expense/ExpenseList';
import Alert from './components/Expense/Alert';

import uuid from 'uuid/v4';
//dummy data just for testing
const initialExpenses = [
  {
    id: uuid(),
    charge: 'rent',
    amount: 600
  },
  {
    id: uuid(),
    charge: 'payment',
    amount: 200
  },
  {
    id: uuid(),
    charge: 'udemy payment',
    amount: 100
  },
  {
    id: uuid(),
    charge: 'credit card',
    amount: 800
  }
];

function App() {
  // state values for all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');
  // functionality
  //handle the onchange
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  //handle amount
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
    } else {
      // send a error alert
    }
  };

  return (
    <>
      <Alert />
      <h1>Calculadora de Gastos</h1>
      <h1>
        Total Gastado:
        <span className='total'>
          R$
          {expenses.reduce((acumulator, current) => {
            return (acumulator += parseInt(current.amount));
          }, 0)}
        </span>
      </h1>
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
    </>
  );
}

export default App;
