import React, { useEffect, useState } from "react";
import LIcon from "../assets/LocationIcon.svg";
import SIcon from "../assets/StatusIcon.svg";
import "./Filter.css"; // Import custom CSS

const Filter = ({ setFilteredData, data, setchange, location }) => {
  const [status, setStatus] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    let temp = [...data];

    temp = temp.filter((v) =>
      status !== ""
        ? status !== "All"
          ? v.status === status
          : true
        : true
    );

    temp = temp.filter((v) =>
      selectedLocation !== ""
        ? selectedLocation !== "All"
          ? v.location === selectedLocation
          : true
        : true
    );

    setFilteredData(temp);
  }, [status, selectedLocation]);

  return (
    <div className="filter-container">
      {/* Location Filter */}
      <div className="filter-group">
        <img src={LIcon} alt="Location Icon" />
        <select
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="filter-select"
          defaultValue=""
        >
          <option value="" disabled>
            Location
          </option>
          <option value="All">All</option>
          {location.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className="filter-group">
        <img src={SIcon} alt="Status Icon" />
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="filter-select"
          defaultValue=""
        >
          <option value="" disabled>
            Status
          </option>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
