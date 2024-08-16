import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  get_expenses,
  insert_expense,
  delete_expenses,
  get_categories,
} from "../api";
import "../css/home.css";
import NavBar from "../Navbar";

function Home({ accessToken, refreshToken }) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    try {
      get_expenses(accessToken).then((value) => {
        setExpenses(value);
      });
      get_categories(accessToken).then((value) => {
        setCategories(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleHome = async () => {
    try {
      //todo: check name, amount, date is not empty
      const result = await insert_expense(
        accessToken,
        name,
        description,
        amount,
        date,
        categoryId
      );
      setExpenses([...expenses, result]);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handle_delete = async (id) => {
    try {
      await delete_expenses(accessToken, id);
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <form id="expense-form">
          <input
            className="expense-input"
            type="text"
            id="expense-name"
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="expense-input"
            type="number"
            id="expense-amount"
            placeholder="Amount"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            className="expense-input"
            type="text"
            id="expense-description"
            placeholder="Expense Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            className="expense-input"
            type="date"
            id="expense-date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <select
            className="expense-input"
            id="expense-category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)} // Update the selected category ID
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleHome();
            }}
          >
            Add Expense
          </button>
        </form>
        <div className="expense-table">
          <table>
            <thead>
              <tr>
                <th>Expense Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="expense-list">
              {expenses.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category.name}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>
                    {/* <button>Edit</button> */}
                    <button
                      id="show-expense"
                      type="button"
                      onClick={() => navigate(`/expense/${expense.id}`)}
                    >
                      Show
                    </button>
                    <button
                      id="delete-expense"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handle_delete(expense.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-amount">
            <strong>Total:</strong>$
            <span id="total-amount">
              {expenses
                .reduce((total, expense) => total + expense.amount, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
