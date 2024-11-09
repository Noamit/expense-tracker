import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem } from "@mui/material";
import CustomBarChart from "../components/CustomBarChart";
import CategoryPieChart from "../components/CategoryPieChart";
import {
  get_expenses_monthly_totals,
  get_expenses_category_totals,
} from "../api";
import "../css/Insights.css"; // Create and import custom styles

function Insights({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const [expensesMonthlyTotals, setExpensesMonthlyTotals] = useState([]);
  const [expensesCategoryTotals, setExpensesCategoryTotals] = useState([]);

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
      get_expenses_monthly_totals(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        months
      ).then((value) => {
        const newExpensesMonthlyTotals = value.map((val) => ({
          amount: val.amount,
          month: val.month + " " + val.year,
        }));
        setExpensesMonthlyTotals(newExpensesMonthlyTotals);
      });

      get_expenses_category_totals(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate
      ).then((value) => {
        setExpensesCategoryTotals(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, [months]);

  return (
    <div className="container">
      <div className="insights-container">
        {/* First Row: One Column with TextField and CustomBarChart */}
        <div className="insights-row single-column">
          <div className="insights-column">
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
          </div>
        </div>

        {/* Second Row: Two Columns with Two Separate Graphs */}
        <div className="insights-row">
          <div className="insights-column">
            <CategoryPieChart data={expensesCategoryTotals} />
          </div>
          <div className="insights-column">
            {/* <ThirdGraphComponent data={expensesMonthlyTotals} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Insights;
