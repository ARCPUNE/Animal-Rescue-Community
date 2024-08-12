import  { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Login from "./Login.jsx"

const CLIENT_ID = "692573051434-0hgefjephdiesb84o5amemldf3643n6c.apps.googleusercontent.com"
// const REDIRECT_URI = "http://localhost:8080/login/oauth2/code/google"

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      const token = tokenResponse.access_token;
      localStorage.setItem('token', token);
      console.log('Logged in successfully', token);
      // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
    },
    onError: errorResponse => console.log('Login error', errorResponse),
  });

  const getUsers = (path) => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert("Please login first");
      return;
    }

    axios.get(`http://localhost:8080/api/${path}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    .then(response => setData(response.data))
    .catch(error => setError(error));
  };

  const renderTable = () => {
    if (data.length === 0) return null;

    const headers = Object.keys(data[0]);

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map((header, subIndex) => (
                <td key={subIndex}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the home page!</p>
      {error && <div>Error: {error.message}</div>}
      <Login login={login} ></Login>
      <button type="button" onClick={() => getUsers('users')}>Get Users</button>
      <button type="button" onClick={() => getUsers('animals')}>Get Animals</button>
      {renderTable()}
    </div>
  );
};

const App = () => (
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Home />
  </GoogleOAuthProvider>
);

export default App;
