import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get_category, update_category } from "../api";
import NavBar from "../Navbar";

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
    e.preventDefault();
    try {
      await update_category(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id,
        updatedCategory
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Edit Category</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={category.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">
              <strong>Description:</strong>
            </label>
            <textarea
              id="description"
              name="description"
              value={category.description}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
}

export default Category;
