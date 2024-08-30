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

function Home({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [receipt, setReceipt] = useState(null); // New state variable for receipt image

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    try {
      get_expenses(accessToken, setAccessToken, setRefreshToken, navigate).then(
        (value) => {
          setExpenses(value);
        }
      );
      get_categories(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate
      ).then((value) => {
        setCategories(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleHome = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("amount", amount);
      formData.append("date", date);
      formData.append("category_id", categoryId);
      if (receipt) {
        formData.append("receipt", receipt); // Add the receipt file to the form data
      }

      const result = await insert_expense(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        formData
      );

      setExpenses([...expenses, result]);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handle_delete = async (id) => {
    try {
      await delete_expenses(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id
      );
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
          <input
            className="expense-input"
            type="file"
            id="expense-receipt"
            accept="image/*"
            onChange={handleFileChange} // Handle file input change
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
                  <td>{expense.category ? expense.category.name : ""}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>
                    {/* <button>Edit</button> */}
                    <button
                      id="edit-expense"
                      type="button"
                      onClick={() =>
                        navigate(`/expense/${expense.id}`, {
                          state: { categories },
                        })
                      }
                    >
                      Edit
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
