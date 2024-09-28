import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem } from "@mui/material";
import {
  get_expenses,
  delete_expenses,
  get_categories,
  get_expenses_monthly_totals,
} from "../api";
import "../css/home.css";
import NavBar from "../Navbar";
import CustomBarChart from "../components/CustomBarChart";

function Home({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [expenses, setExpenses] = useState([]);
  const [expensesMonthlyTotals, setExpensesMonthlyTotals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [months, setMonths] = useState([]);

  const options = [
    { id: 1, name: "previous month" },
    { id: 3, name: "last 3 month" },
    { id: 6, name: "last 6 month" },
    { id: 9, name: "last 9 month" },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    try {
      get_expenses(accessToken, setAccessToken, setRefreshToken, navigate).then(
        (value) => {
          setExpenses(value);
        }
      );
      get_expenses_monthly_totals(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate
      ).then((value) => {
        console.log(value);
        setExpensesMonthlyTotals(value);
      });
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

  useEffect(() => {
    get_expenses_monthly_totals(
      accessToken,
      setAccessToken,
      setRefreshToken,
      navigate,
      months
    ).then((value) => {
      setExpensesMonthlyTotals(value);
    });
  }, [months]);

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
        <TextField
          fullWidth
          select
          margin="normal"
          label="Show previous months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          required
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <CustomBarChart data={expensesMonthlyTotals} />
        <div>
          <button
            id="create-expense"
            type="button"
            onClick={() =>
              navigate(`/expense`, {
                state: { categories },
              })
            }
          >
            Add Expense
          </button>
        </div>
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
