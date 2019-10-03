import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import './App.css';

import ExpenseForm from './components/Expense/ExpenseForm';
import ExpenseList from './components/Expense/ExpenseList';
import Alert from './components/Expense/Alert';

const initialExpenses = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : [];

//dummy data just for testing if don't wanna use localStorage
// const initialExpenses = [
//   {
//     id: uuid(),
//     charge: 'rent',
//     amount: 600
//   },
//   {
//     id: uuid(),
//     charge: 'payment',
//     amount: 200
//   },
//   {
//     id: uuid(),
//     charge: 'udemy payment',
//     amount: 100
//   },
//   {
//     id: uuid(),
//     charge: 'credit card',
//     amount: 800
//   }
// ];

function App() {
  // state values for all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState('');
  // single amount
  const [amount, setAmount] = useState('');
  //alert initial false
  const [alert, setAlert] = useState({
    show: false
  });
  //edit
  const [edit, setEdit] = useState(false);
  //edit single item
  const [id, setId] = useState(0);
  //useEffect
  useEffect(() => {
    console.log('Local Storage Works!!');
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  // functionality

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({
      show: true,
      type,
      text
    });
    //when time out, back show to false, 7000 is the time in milliseconds
    setTimeout(
      () =>
        setAlert({
          show: false
        }),
      7000
    );
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
      if (edit) {
        let tempExpenses = expenses.map(item => {
          //acessing the particular value and override the data
          return item.id === id
            ? {
                ...item,
                charge,
                amount
              }
            : item;
        });
        //saving my new expense using the same if of my old expense
        setExpenses(tempExpenses);
        //backing edit to false, because I need the button Salvar
        setEdit(false);
        handleAlert({
          type: 'success',
          text: 'Item editado!'
        });
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({
          type: 'success',
          text: 'Item adicionado!'
        });
      }
      setCharge('');
      setAmount('');
    } else {
      handleAlert({
        type: 'danger',
        text: `Nome não pode ser em branco e o valor deve ser maior que zero!`
      });
    }
  };

  //button edit single item
  const handleEdit = id => {
    //running throw my array to find a id equals to my
    let expense = expenses.find(item => item.id === id);
    //saving the data in my object expense
    let { charge, amount } = expense;
    //seting a new charge to this item
    setCharge(charge);
    //seting a new amount to this item
    setAmount(amount);
    //changing to true, because I wanna
    //to change my button Salvar to Edit
    setEdit(true);
    //seting a new id to this item
    setId(id);
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
    handleAlert({
      type: 'success',
      text: `Todos os items foram deletados!`
    });
  };

  return (
    <>
      <h1> Calculadora de Gastos </h1>

      <h1>
        Total:
        <span className='total'>
          R$
          {expenses.reduce((acumulator, current) => {
            return (acumulator += parseInt(current.amount));
          }, 0)}
        </span>
      </h1>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <main className='App'>
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
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
