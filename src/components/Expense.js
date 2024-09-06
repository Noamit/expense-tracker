import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { get_expense, update_expense } from "../api";
import NavBar from "../Navbar";

function Expense({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const { id } = useParams();
  const [expense, setExpense] = useState({});
  const [updatedExpense, setUpdatedExpense] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const { categories } = location.state || {}; // Extract categories from the state

  useEffect(() => {
    try {
      get_expense(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id
      ).then((value) => {
        console.log(value);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file

    const fileURL = URL.createObjectURL(file);
    setExpense((prevExpense) => ({
      ...prevExpense,
      receipt_url: fileURL, // Temporary URL for preview
    }));
    setUpdatedExpense({ ...updatedExpense, receipt: file });
    // setReceipt(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(updatedExpense).forEach((key) => {
        formData.append(key, updatedExpense[key]);
      });
      await update_expense(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id,
        formData
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!expense) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
            {expense.receipt_url && (
              <div>
                <img src={expense.receipt_url} alt="Uploaded File" />
              </div>
            )}
            <div>
              <label htmlFor="receipt">
                <strong>Upload Receipt:</strong>
              </label>
              <input
                type="file"
                id="receipt"
                name="receipt"
                accept="image/*" // Optional: Limit to image file types
                onChange={handleFileChange} // Function to handle file selection
              />
            </div>
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
