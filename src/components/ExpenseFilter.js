import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";

const ExpenseFilter = ({ categories, onFilter }) => {
  const [name, setName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [date, setDate] = useState("");

  const handleFilter = () => {
    const filter_data = { name, category_id, date };
    const filtered_data = Object.fromEntries(
      Object.entries(filter_data).filter(([key, value]) => value !== "")
    );

    onFilter(filtered_data);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          margin="normal"
          label="Expense Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
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
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          margin="normal"
          label="Date"
          variant="outlined"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default ExpenseFilter;
