import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [dataF, setDataF] = useState({name: '' , email: ''});
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setDataF({...data, [e.target.name] : e.target.value});
  }
  const handleSubmit = async (e) => {
    e.prevnetDefualt();

    try {
      const res = await axios.post("https://localhost:5000/", dataF, {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch(err) {
      console.log(err);
    }
  } 

  console.log(dataF);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sending Data :</h1>
        <input type="text" name="name" value={dataF.name} onChange={handleChange} />
        <input type="email" name="email" value={dataF.email} onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
