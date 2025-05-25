import axios from 'axios'
import React from 'react'

function Profiles() {
  const [kids, setKids] = React.useState([]);
  React.useEffect(() => {
    const fetchKids = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Admin/manage-kids");
        console.log(response.data);
        setKids(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchKids();
  }, []);
  console.log(kids);
  return (
    <div>
      <ul>
        
      </ul>
    </div>
  )
}

export default Profiles