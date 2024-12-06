import React, { useEffect, useState } from "react";
import DisableIcon from "../assets/Deactivate.svg";
import StatusTick from "../assets/StatusTick.svg";
import Cloud from "../assets/Cloud.svg";
import device from "../assets/Edge.svg";
import warning from "../assets/Warning.svg";
import arrow from "../assets/arrow.svg";
import doublearrow from "../assets/doublearrow.svg";
import "./CameraTable.css"; // Import custom CSS
import { API_URL, TOKEN } from "../utils/constants";

const CameraTable = ({ filteredData, handleStatusChange }) => {
  const [perPage, setPerPage] = useState(10);
  const [currPage, setCurrPage] = useState(1);
  const [viewData, setviewData] = useState([]);
  const TOTAL_PAGES = Math.ceil(filteredData?.length / perPage);

  function handleNextpage() {
    if (currPage + 1 <= TOTAL_PAGES) {
      setCurrPage((p) => p + 1);
    }
  }

  function handlePreviousPage() {
    if (currPage >= 2) {
      setCurrPage((p) => p - 1);
    }
  }

  useEffect(() => {
    let temp = [...filteredData];
    setviewData(temp.splice((currPage - 1) * perPage, perPage));
  }, [perPage, currPage]);

  useEffect(() => {
    setviewData([...filteredData].splice(0, 10));
  }, [filteredData]);

  return (
    <>
      <table className="camera-table">
        <thead>
          <tr className="header-row">
            <th>NAME</th>
            <th>HEALTH</th>
            <th>LOCATION</th>
            <th>RECORDER</th>
            <th>TASKS</th>
            <th>STATUS</th>
            <th className="actions-header">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {viewData.map((camera, index) => (
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td>
                <div className="name-container">
                  <div
                    className={`status-indicator ${
                      camera?.current_status === "Online" ? "online" : "offline"
                    }`}
                  ></div>
                  <div className="name-details">
                    <span>{camera?.name}</span>
                    {camera?.hasWarning && (
                      <img src={warning} className="warning-icon" alt="Warning" />
                    )}
                    <div className="email">{camera?.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="health-container">
                  <div className="health-item">
                    <img src={Cloud} alt="Cloud" />
                    <span
                      className={`health-status ${
                        camera.health.cloud === "A"
                          ? "status-green"
                          : camera.health.cloud === "F"
                          ? "status-red"
                          : "status-orange"
                      }`}
                    >
                      {camera.health.cloud}
                    </span>
                  </div>
                  <div className="health-item">
                    <img src={device} alt="Device" />
                    <span
                      className={`health-status ${
                        camera.health.device === "A"
                          ? "status-green"
                          : camera.health.device === "F"
                          ? "status-red"
                          : "status-orange"
                      }`}
                    >
                      {camera.health.device}
                    </span>
                  </div>
                </div>
              </td>
              <td>{camera?.location}</td>
              <td>{camera?.recorder === "" ? "N/A" : camera?.recorder}</td>
              <td>{camera?.tasks} Tasks</td>
              <td>
                <div
                  className={`status-badge ${
                    camera?.status === "Active" ? "active" : "inactive"
                  }`}
                >
                  {camera?.status}
                </div>
              </td>
              <td>
                <div className="actions-container">
                  <img
                    onClick={() => handleStatusChange(camera, index)}
                    src={camera?.status === "Active" ? DisableIcon : StatusTick}
                    alt="Action Icon"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <div className="pagination-controls">
          <select
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            className="per-page-selector"
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <div>
            {(currPage - 1) * perPage + 1}-
            {Math.min(currPage * perPage, filteredData?.length)} of{" "}
            {filteredData?.length}
          </div>
          <div className="page-navigation">
            <img src={doublearrow} alt="First Page" className="double-arrow" />
            <img
              src={arrow}
              onClick={handlePreviousPage}
              alt="Previous Page"
              className="arrow"
            />
            <span>{currPage}</span>
            <img
              src={arrow}
              onClick={handleNextpage}
              alt="Next Page"
              className="arrow rotated"
            />
            <img
              src={doublearrow}
              alt="Last Page"
              className="double-arrow rotated"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraTable;
