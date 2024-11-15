import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";

const ExpenseFilter = ({ categories, onFilter }) => {
  const [name, setName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const handleFilter = () => {
    const filter_data = { name, category_id, start_date, end_date };
    const filtered_data = Object.fromEntries(
      Object.entries(filter_data).filter(([key, value]) => value !== "")
    );
    onFilter(filtered_data);
  };

  const handleClear = () => {
    setName("");
    setCategoryId("");
    setStartDate("");
    setEndDate("");
    onFilter({});
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={2}>
        <TextField
          fullWidth
          margin="normal"
          label="Expense Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          fullWidth
          margin="normal"
          label="Category"
          variant="outlined"
          select
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          fullWidth
          margin="normal"
          label="Start Date"
          variant="outlined"
          type="date"
          value={start_date}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          fullWidth
          margin="normal"
          label="End Date"
          variant="outlined"
          type="date"
          value={end_date}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" color="primary" onClick={handleFilter}>
            Filter
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default ExpenseFilter;
