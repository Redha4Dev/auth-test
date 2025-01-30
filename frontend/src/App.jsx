import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    axios
    .get("https://localhost:5000/users")
    .then((response) => setUsers(response.data))
    .catch((err) => console.log(err))
  },[])
  return (
    <div>
      <h1>Users List :</h1>
      <ul>
        {Users.map((user) => <li key={user.id}>{user.name} - {user.age} Years Old</li>)}
      </ul>
    </div>
  )
}

export default App
