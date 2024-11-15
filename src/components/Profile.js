import React, { useState, useEffect } from "react";
import { update_settings, update_password } from "../api";
import { useNavigate } from "react-router-dom";

function Profile({ onLangChange, setAccessToken, setRefreshToken }) {
  const accessToken = localStorage.getItem("access_token");

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [langs, setLangs] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedGD = localStorage.getItem("general_declaration");
    const lang_id = localStorage.getItem("lang_id");

    if (storedGD) {
      const parsedGD = JSON.parse(storedGD);
      setLangs(parsedGD.langs || {});
    }

    if (lang_id) {
      setSelectedLanguage(lang_id);
    }
  }, []);

  const handleLanguageChange = async (event) => {
    const newLang = event.target.value;

    try {
      await update_settings(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        newLang
      );
    } catch (error) {
      console.error(error);
    }

    setSelectedLanguage(newLang);
    onLangChange(newLang);
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const res = await update_password(
        accessToken,
        setAccessToken,
        setRefreshToken,
        navigate,
        {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );
      if (!res.updated) {
        setPasswordError(res.data);
        return;
      } else {
        setPasswordSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div style={{ margin: "0 auto" }}>
        <h2>Profile Settings</h2>

        <div>
          <label htmlFor="language">Change Language:</label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.entries(langs).map(([langId, langName]) => (
              <option key={langId} value={langId}>
                {langName}
              </option>
            ))}
          </select>
        </div>

        {/* Password Change Section */}
        <div style={{ marginTop: "20px" }}>
          <h3>
            Change Password{" "}
            <i
              className={`fas ${
                showPasswordFields ? "fa-eye-slash" : "fa-eye"
              }`}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                fontSize: "16px",
                color: "#007bff",
              }}
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              title={
                showPasswordFields
                  ? "Hide Password Fields"
                  : "Show Password Fields"
              }
            ></i>
          </h3>
          {showPasswordFields && (
            <form onSubmit={handlePasswordChange}>
              <div>
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {passwordError}
                  </p>
                )}
              </div>
              <button type="submit">Update Password</button>
            </form>
          )}
          {passwordSuccess && (
            <p style={{ color: "green", fontSize: "12px" }}>
              {passwordSuccess}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
