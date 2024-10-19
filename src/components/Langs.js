import React, { useState, useEffect } from "react";
import { get_langs, insert_lang, delete_lang, update_lang } from "../api";
import "../css/Categories.css";
import { useNavigate } from "react-router-dom";

function Langs({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [name, setName] = useState(null);
  const [langs, setLangs] = useState([]);
  const [editLangId, setEditLangId] = useState(null); // Track the language being edited
  const [editLangName, setEditLangName] = useState(""); // Track the edited name

  const navigate = useNavigate();

  useEffect(() => {
    try {
      get_langs(accessToken, setAccessToken, setRefreshToken, navigate).then(
        (value) => {
          setLangs(value);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleHome = async () => {
    try {
      //todo: check name, amount, date is not empty
      const result = await insert_lang(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        name
      );
      setLangs([...langs, result]);
    } catch (error) {
      console.error(error);
    }
  };

  const handle_delete = async (id) => {
    console.log(id);
    try {
      await delete_lang(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id
      );
      const updatedLangs = langs.filter((lang) => lang.id !== id);
      setLangs(updatedLangs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id, currentName) => {
    setEditLangId(id); // Set the language being edited
    setEditLangName(currentName); // Set the current name in the edit input
  };

  const handleSave = async (id) => {
    try {
      await update_lang(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id,
        { name: editLangName }
      );
      // Update the language name in the langs array after saving
      setLangs((prevLangs) =>
        prevLangs.map((lang) =>
          lang.id === id ? { ...lang, name: editLangName } : lang
        )
      );
      setEditLangId(null); // Reset the editing state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <form id="category-form">
          <input
            className="category-input"
            type="text"
            id="category-name"
            placeholder="Lang Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleHome();
            }}
          >
            Add Lang
          </button>
        </form>
        <div className="category-table">
          <table>
            <thead>
              <tr>
                <th>Lang Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="category-list">
              {langs.map((lang) => (
                <tr key={lang.id}>
                  <td>
                    {editLangId === lang.id ? (
                      <input
                        type="text"
                        value={editLangName}
                        onChange={(e) => setEditLangName(e.target.value)}
                      />
                    ) : (
                      lang.name
                    )}
                  </td>
                  <td>
                    {editLangId === lang.id ? (
                      <>
                        <button
                          id="save-category"
                          type="button"
                          onClick={() => handleSave(lang.id)}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          id="edit-category"
                          type="button"
                          onClick={() => handleEdit(lang.id, lang.name)}
                        >
                          Edit
                        </button>
                        <button
                          id="delete-category"
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault();
                            handle_delete(lang.id);
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
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

export default Langs;
