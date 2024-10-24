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
import ExpenseFilter from "./ExpenseFilter";

import CustomBarChart from "../components/CustomBarChart";

function Home({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const storedTranslations = localStorage.getItem("translations");
  const parsedTranslations = storedTranslations
    ? JSON.parse(storedTranslations)
    : null;
  const [expenses, setExpenses] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [expensesMonthlyTotals, setExpensesMonthlyTotals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [months, setMonths] = useState(6);

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
          setExpenses(value.expenses);
          setTotalPages(value.total_pages);
        }
      );
      get_expenses_monthly_totals(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate
      ).then((value) => {
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
  }, [months, expenses]);

  useEffect(() => {
    get_expenses(
      accessToken,
      setAccessToken,
      setRefreshToken,
      navigate,
      filters
    ).then((value) => {
      setExpenses(value.expenses);
      setTotalPages(value.total_pages);
    });
  }, [currentPage]);

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

  const handleFilter = async (filters) => {
    get_expenses(
      accessToken,
      setAccessToken,
      setRefreshToken,
      navigate,
      filters
    ).then((value) => {
      setExpenses(value.expenses);
      setTotalPages(value.total_pages);
      setFilters(filters);
      setCurrentPage(1);
    });
  };

  const handlePageChange = (page) => {
    filters.page = page;
    setFilters(filters);
    setCurrentPage(page);
  };

  return (
    <>
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
          <ExpenseFilter categories={categories} onFilter={handleFilter} />
          {/* Render your list of expenses here */}
        </div>
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
            {parsedTranslations
              ? parsedTranslations.add_expense_button
              : "Add Expense"}
          </button>
        </div>
        <div className="expense-table">
          <table>
            <thead>
              <tr>
                <th>
                  {parsedTranslations
                    ? parsedTranslations.expense_name
                    : "Expense Name"}
                </th>
                <th>
                  {parsedTranslations
                    ? parsedTranslations.description
                    : "Description"}
                </th>
                <th>
                  {parsedTranslations
                    ? parsedTranslations.category
                    : "Category"}
                </th>
                <th>
                  {parsedTranslations ? parsedTranslations.amount : "Amount"}
                </th>
                <th>
                  {parsedTranslations ? parsedTranslations.action : "Action"}
                </th>
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
                      {parsedTranslations ? parsedTranslations.edit : "Edit"}
                    </button>
                    <button
                      id="delete-expense"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handle_delete(expense.id);
                      }}
                    >
                      {parsedTranslations
                        ? parsedTranslations.delete
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-amount">
            <strong>
              {parsedTranslations ? parsedTranslations.total : "Total"}:
            </strong>
            $
            <span id="total-amount">
              {expenses
                .reduce((total, expense) => total + expense.amount, 0)
                .toFixed(2)}
            </span>
          </div>
          {/* Pagination Bar */}
          <div className="pagination-bar">
            {currentPage !== 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
                {/* {parsedTranslations ? parsedTranslations.previous : "Previous"} */}
              </button>
            )}

            <span>
              Page{" "}
              {/* {parsedTranslations ? parsedTranslations.page : "Page"}{" "} */}
              {currentPage} of
              {/* {parsedTranslations ? parsedTranslations.of : "of"} */}{" "}
              {totalPages}
            </span>

            {currentPage !== totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                {/* {parsedTranslations ? parsedTranslations.next : "Next"} */}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
