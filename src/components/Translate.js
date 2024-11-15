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
import { get_translate, update_translate } from "../api";

function Translate({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const { id } = useParams();
  const [translate, setTranslate] = useState({});
  const [updatedTranslate, setUpdatedTranslate] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const { langs } = location.state || {};

  useEffect(() => {
    try {
      get_translate(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id
      ).then((value) => {
        setTranslate(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTranslate({ ...translate, [name]: value });
    setUpdatedTranslate({ ...updatedTranslate, [name]: value });
  };

  const handleLangChange = (e) => {
    const LangId = e.target.value;
    setTranslate({ ...translate, lang_id: LangId });
    setUpdatedTranslate({ ...updatedTranslate, lang_id: LangId });
  };

  const handleSubmit = async (e) => {
    try {
      const updateData = {};
      Object.keys(updatedTranslate).forEach((key) => {
        updateData[key] = updatedTranslate[key];
      });
      await update_translate(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id,
        updateData
      );
      navigate("translates");
    } catch (error) {
      console.error(error);
    }
  };

  if (!translate) {
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
            Edit Translate
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
              label="Translate Name"
              variant="outlined"
              name="key"
              InputLabelProps={{
                shrink: translate.key !== "" && translate.key !== null, // Force label to shrink when there's a value
              }}
              value={translate.key}
              InputProps={{
                readOnly: true, // Makes the field read-only
              }}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              id="expense-description"
              label="Translate Value"
              variant="outlined"
              name="value"
              value={translate.value}
              InputLabelProps={{
                shrink: translate.value !== "" && translate.value !== null, // Force label to shrink when there's a value
              }}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              select
              margin="normal"
              name="lang_id"
              label="Select Language"
              value={translate.lang_id || ""}
              onChange={handleLangChange}
              required
            >
              {langs.map((lang) => (
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
              Save Changes
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Translate;
