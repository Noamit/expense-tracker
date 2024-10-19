import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { get_expense, update_expense } from "../api";

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
    try {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setExpense((prevExpense) => ({
        ...prevExpense,
        receipt_url: fileURL, // Temporary URL for preview
      }));
      setUpdatedExpense({ ...updatedExpense, receipt: file });
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
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
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit Expense
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <TextField
              fullWidth
              margin="normal"
              id="expense-name"
              label="Expense Name"
              variant="outlined"
              name="name"
              InputLabelProps={{
                shrink: expense.name !== "" && expense.name !== null, // Force label to shrink when there's a value
              }}
              value={expense.name}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              id="expense-amount"
              label="Amount"
              variant="outlined"
              type="number"
              inputProps={{
                step: "0.01",
                min: "0",
              }}
              InputLabelProps={{
                shrink: expense.amount !== "" && expense.amount !== null, // Force label to shrink when there's a value
              }}
              name="amount"
              value={expense.amount}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              id="expense-description"
              label="Expense Description"
              variant="outlined"
              name="description"
              value={expense.description}
              InputLabelProps={{
                shrink:
                  expense.description !== "" && expense.description !== null, // Force label to shrink when there's a value
              }}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              id="expense-date"
              label="Date"
              variant="outlined"
              type="date"
              name="date"
              value={expense.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
            />

            <TextField
              fullWidth
              select
              margin="normal"
              label="Select Category"
              value={expense.category_id || ""}
              onChange={handleCategoryChange}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            {expense.receipt_url && (
              <div style={{ marginBottom: "20px" }}>
                <a
                  href={expense.receipt_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={expense.receipt_url}
                    alt="Uploaded File"
                    style={{
                      width: "100px",
                      height: "auto",
                      cursor: "pointer",
                    }}
                  />
                </a>
              </div>
            )}
            <Button variant="contained" component="label">
              Upload Receipt
              <input
                type="file"
                hidden
                name="receipt"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: "20px" }}
            >
              Save Changes
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Expense;
