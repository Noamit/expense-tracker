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

import { insert_translate } from "../api";
import NavBar from "../Navbar";

function InsertTranslate({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [lang_id, setLangId] = useState("");

  const location = useLocation();
  const { langs } = location.state || {}; // Extract categories from the state

  const navigate = useNavigate();

  const handleInsert = async () => {
    try {
      const insertData = { key, value, lang_id };
      console.log(insertData);
      const result = await insert_translate(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        insertData
      );
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
            Add New Translate
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
              label="Translate Key"
              variant="outlined"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              id="expense-description"
              label="Translate Value"
              variant="outlined"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />

            <TextField
              fullWidth
              select
              margin="normal"
              label="Select Lang"
              value={lang_id}
              onChange={(e) => setLangId(e.target.value)}
              required
            >
              {langs &&
                langs.map((lang) => (
                  <MenuItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </MenuItem>
                ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: "20px" }}
            >
              Add Translate
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default InsertTranslate;
