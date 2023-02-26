import { useState, useEffect } from 'react';
import './Expenses.css';

const ExpenseList = ({ expenses }) => {
  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <div className="expense-item">
                <div className="expense-item__description">{expense.description}</div>
                <div className="expense-item__category">{expense.category}</div>
                <div className="expense-item__amount">₹ {expense.amount}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet.</p>
      )}
    </div>
  );
};

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ amount: '', description: '', category: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  useEffect(() => {
    fetch('https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/expenses.json')
      .then(response => response.json())
      .then(data => {
        const fetchedExpenses = [];
        for (const key in data) {
          fetchedExpenses.push({
            id: key,
            ...data[key]
          });
        }
        setExpenses(fetchedExpenses);
      })
      .catch(error => console.log(error));
  }, []);
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
    const newExpenseWithId = { ...newExpense, id: newId };
    setExpenses((prevExpenses) => [...prevExpenses, newExpenseWithId]);
    setNewExpense({ amount: '', description: '', category: '' });
  
    fetch('https://react-expense-tracker-bdc60-default-rtdb.firebaseio.com/expenses.json', {
      method: 'POST',
      body: JSON.stringify(newExpenseWithId),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          console.log('Expense added successfully!');
        } else {
          throw new Error('Failed to add expense!');
        }
      })
      .catch(error => console.log(error));
  };
  

  return (
    <div className="expense-tracker">
      <h1>Expense Tracker</h1>
      <form className='expenses-form' onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={newExpense.category} onChange={handleInputChange} required>
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Electricity</option>
            <option value="Salary">Entertainment</option>
            <option value="Salary">Furniture</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Expenses;
