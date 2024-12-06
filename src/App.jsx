import "./index.css"; 
import Logo from "./assets/BrandLogo.svg";
import Search from "./components/Search";
import Filter from "./components/Filter";
import CameraTable from "./components/CameraTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, TOKEN } from "./utils/constants";

function App() {
  const [TableData, setTableData] = useState([]);
  const [location, setLocations] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [change, setchange] = useState(false);

  async function fetchTableData() {
    try {
      const {
        data: { data },
      } = await axios.get(`${API_URL}/fetch/cameras`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      setTableData(data);
      setFilteredData(data);
      setLocations([...new Set(data.map((v) => v.location))]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleStatusChange(obj, idx) {
    try {
      const {
        data: { data },
      } = await axios.put(
        `${API_URL}/update/camera/status`,
        {
          id: obj.id,
          status: obj.status === "Active" ? "Inactive" : "Active",
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setFilteredData((p) => p.map((val) => (val.id === obj.id ? data : val)));
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="app-container">
      <div className="logo-container">
        <img src={Logo} alt="Brand Logo" />
      </div>
      <Search />
      <Filter
        location={location}
        setchange={setchange}
        data={TableData}
        setFilteredData={setFilteredData}
      />
      <CameraTable
        handleStatusChange={handleStatusChange}
        filteredData={FilteredData}
      />
    </div>
  );
}

export default App;
