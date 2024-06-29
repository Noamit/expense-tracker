import React, { useState } from "react";
import "./css/App.css";
import Register from "./components/Register";
import Login from "./components/Login";
function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      <h1>Expense Tracker</h1>
      {!token ? (
        <div>
          <Register />
          <Login setToken={setToken} />
        </div>
      ) : (
        <div>hello</div>
      )}
    </div>
  );
}

export default App;
