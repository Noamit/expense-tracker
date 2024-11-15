import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get_translates, delete_translate, get_langs } from "../api";
import "../css/home.css";

function Translates({ setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [translates, setTranslates] = useState([]);
  const [langs, setLangs] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    try {
      get_translates(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate
      ).then((value) => {
        setTranslates(value);
      });
      get_langs(accessToken, setAccessToken, setRefreshToken, navigate).then(
        (value) => {
          setLangs(value);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handle_delete = async (id) => {
    try {
      await delete_translate(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        id
      );
      const updatedTranslates = translates.filter(
        (translate) => translate.id !== id
      );
      setTranslates(updatedTranslates);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <button
            id="create-expense"
            type="button"
            onClick={() =>
              navigate(`/translate`, {
                state: { langs },
              })
            }
          >
            Add Translate
          </button>
        </div>
        <div className="expense-table">
          <table>
            <thead>
              <tr>
                <th>Translate Key</th>
                <th>Translate Value</th>
                <th>Language</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="expense-list">
              {translates.map((translate, index) => (
                <tr key={translate.id}>
                  <td>{translate.key}</td>
                  <td>{translate.value}</td>
                  <td>{translate.lang ? translate.lang.name : ""}</td>
                  <td>
                    <button
                      id="edit-expense"
                      type="button"
                      onClick={() =>
                        navigate(`/translate/${translate.id}`, {
                          state: { langs },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      id="delete-expense"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handle_delete(translate.id);
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

export default Translates;
