import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const [userEmail, setUserEmail] = useState([]);
  const [userPassword, setUserPassword] = useState([]);

  const { setUser } = useContext(UserContext);

  const history = useHistory();

  function redirectToUserPage() {
    history.push("/userpage");
  }

  function authenticateUser() {
    let user = {
      email: userEmail,
      password: userPassword,
    };

    fetch("http://localhost:8080/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    }).then(async (response) => {
      if (response.status === 200) {
        let dataFromBackend = await response.json();
        setUser(dataFromBackend);
        redirectToUserPage();
      }
      if (response.status === 401) {
        let messageResponse = await response.json();
        alert(messageResponse.message);
      }
    });
  }

  return (
    <div>
      <input
        className="userEmail"
        type="text"
        required
        placeholder="E-mail"
        onChange={(event) => setUserEmail(event.target.value)}
      ></input>
      <input
        className="userPassword"
        type="password"
        required
        placeholder="Lösenord"
        onChange={(event) => setUserPassword(event.target.value)}
      ></input>
      <button onClick={() => authenticateUser()}>Logga in!</button>
    </div>
  );
}
