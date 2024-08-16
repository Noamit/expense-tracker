import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_expense } from "../api";
import NavBar from "../Navbar";
function Expense({ accessToken, refreshToken }) {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    try {
      get_expense(accessToken, id).then((value) => {
        setExpense(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  if (!expense) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Expense Details</h1>
        <p>
          <strong>Name:</strong> {expense.name}
        </p>
        <p>
          <strong>Description:</strong> {expense.description}
        </p>
        <p>
          <strong>Amount:</strong> ${expense.amount.toFixed(2)}
        </p>
        <p>
          <strong>Date:</strong> {expense.date}
        </p>
      </div>
    </>
  );
}

export default Expense;
