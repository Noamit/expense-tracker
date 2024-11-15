import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get_category, update_category } from "../api";
import {
  Button,
  TextField,
  MenuItem,
  Container,
  Box,
  Typography,
} from "@mui/material";

function Category({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const { id } = useParams();

  const [category, setCategory] = useState({});
  const [updatedCategory, setUpdatedCategory] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    try {
      get_category(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id
      ).then((value) => {
        setCategory(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      await update_category(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id,
        updatedCategory
      );
      navigate("/category");
    } catch (error) {
      console.error(error);
    }
  };

  if (!category) {
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
            Edit Category
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
              id="category-name"
              label="Category Name"
              variant="outlined"
              name="name"
              InputLabelProps={{
                shrink: category.name !== "" && category.name !== null, // Force label to shrink when there's a value
              }}
              value={category.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              id="category-description"
              label="Category Description"
              variant="outlined"
              name="description"
              value={category.description}
              InputLabelProps={{
                shrink:
                  category.description !== "" && category.description !== null, // Force label to shrink when there's a value
              }}
              onChange={handleInputChange}
            />

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

export default Category;
