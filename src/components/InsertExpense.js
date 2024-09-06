import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { insert_expense, get_categories } from "../api";
import "../css/home.css";
import NavBar from "../Navbar";

function InsertExpense({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [receipt, setReceipt] = useState(null); // New state variable for receipt image

  const location = useLocation();
  const { categories } = location.state || {}; // Extract categories from the state

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setReceipt(e.target.files[0]);
  };

  const handleInsert = async () => {
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

      console.log(result);
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
              handleInsert();
            }}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default InsertExpense;
