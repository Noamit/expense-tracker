import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Box,
  Typography,
} from "@mui/material";

import { insert_expense } from "../api";
import NavBar from "../Navbar";

function InsertExpense({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
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
            Add New Expense
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInsert();
            }}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <TextField
              fullWidth
              margin="normal"
              id="expense-name"
              label="Expense Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              id="expense-amount"
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              id="expense-description"
              label="Expense Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              id="expense-date"
              label="Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <TextField
              fullWidth
              select
              margin="normal"
              label="Select Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              {categories &&
                categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" component="label">
              Upload Receipt
              <input
                type="file"
                hidden
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
              Add Expense
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default InsertExpense;
