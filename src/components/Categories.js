import React, { useState, useEffect } from "react";
import { get_categories, insert_category, delete_category } from "../api";
import NavBar from "../Navbar";
import "../css/Categories.css";
import { useNavigate } from "react-router-dom";

function Categories({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      get_categories(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate
      ).then((value) => {
        setCategories(value);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleHome = async () => {
    try {
      //todo: check name, amount, date is not empty
      const result = await insert_category(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        name,
        description
      );
      setCategories([...categories, result]);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handle_delete = async (id) => {
    try {
      await delete_category(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id
      );
      const updatedCategories = categories.filter(
        (category) => category.id !== id
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <form id="category-form">
          <input
            className="category-input"
            type="text"
            id="category-name"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="category-input"
            type="text"
            id="category-description"
            placeholder="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleHome();
            }}
          >
            Add Category
          </button>
        </form>
        <div className="category-table">
          <table>
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="category-list">
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      id="edit-category"
                      type="button"
                      onClick={() => navigate(`/category/${category.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      id="delete-category"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handle_delete(category.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Categories;
