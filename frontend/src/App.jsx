import { useState } from "react";
import axios from "axios";

function App() {
  const [dataF, setDataF] = useState({ name: '', email: '' });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setDataF({ ...dataF, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload
    try {
      const res = await axios.post("http://localhost:5000/", dataF, {
        headers: { 'Content-Type': 'application/json' },
      });
      setResponse(res.data);  // Save response
      console.log('Data sent:', res.data);
    } catch (err) {
      console.error('Error sending data:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sending Data :</h1>
        <input type="text" name="name" value={dataF.name} onChange={handleChange} />
        <input type="email" name="email" value={dataF.email} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h2>Server Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
