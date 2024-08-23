import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { get_expense, update_expense } from "../api";
import NavBar from "../Navbar";

function Expense({ accessToken, refreshToken }) {
  const { id } = useParams();
  const [expense, setExpense] = useState({});
  const [updatedExpense, setUpdatedExpense] = useState({});
  const location = useLocation();
  const { categories } = location.state || {}; // Extract categories from the state

  console.log(categories);
  useEffect(() => {
    try {
      get_expense(accessToken, id).then((value) => {
        setExpense(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
    setUpdatedExpense({ ...updatedExpense, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setExpense({ ...expense, category_id: categoryId });
    setUpdatedExpense({ ...updatedExpense, category_id: categoryId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update_expense(accessToken, id, updatedExpense);
    } catch (error) {
      console.error(error);
    }
  };

  if (!expense) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {console.log(expense)}
      <NavBar />
      <div className="container">
        <h1>Edit Expense</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={expense.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">
              <strong>Description:</strong>
            </label>
            <textarea
              id="description"
              name="description"
              value={expense.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="amount">
              <strong>Amount:</strong>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              value={expense.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="date">
              <strong>Date:</strong>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={expense.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category">
              <strong>Category:</strong>
            </label>
            <select
              className="expense-input"
              id="expense-category"
              value={expense.category_id || ""}
              onChange={handleCategoryChange}
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
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
}

export default Expense;
