import React, { useState } from "react";
import { home } from "../api";

function Home({ token }) {
  const [data, setData] = useState(null);

  const handleHome = async () => {
    try {
      const result = await home(token);
      setData(result);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleHome}>Get Protected Data</button>
      {data && <div>Logged in as: {data.logged_in_as}</div>}
    </div>
  );
}

export default Home;
