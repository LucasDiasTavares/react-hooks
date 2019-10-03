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
  //alert initial false
  const [alert, setAlert] = useState({ show: false });

  // functionality

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    //when time out, back show to false, 7000 is the time in milliseconds
    setTimeout(() => setAlert({ show: false }), 7000);
  };
  //handle the change
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
      setCharge('');
      setAmount('');
      handleAlert({ type: 'success', text: 'Item adicionado!' });
    } else {
      handleAlert({
        type: 'danger',
        text: `Nome não pode ser em branco e o valor deve ser maior que zero!`
      });
    }
  };

  //button edit single item
  const handleEdit = id => {
    //console.log(`item edited : ${id}`);
  };

  //button delete single item
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({
      type: 'success',
      text: `item deletado com sucesso!`
    });

    //console.log(`item deleted : ${id}`);
  };

  //button clear expenses
  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'success', text: `Todos os items foram deletados!` });
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
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
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
    </>
  );
}

export default App;
