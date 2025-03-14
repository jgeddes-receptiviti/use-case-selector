import React, { useEffect, useState } from "react";
import "./FrameworkChooser.css";

const JSON_URL =
  "https://39959461.fs1.hubspotusercontent-na1.net/hubfs/39959461/updated-use-case-matrix8.json";

const createMeasureLinks = (measures) => {
  return (
    <>
      <strong>Highlighted Measures:</strong>{" "}
      {measures.map((measure, index) => (
        <React.Fragment key={index}>
          {index > 0 && ", "}
          <a
            href={measure.url || "#"}
            className="measure-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {measure.name}
          </a>
        </React.Fragment>
      ))}
    </>
  );
};

const createFrameworkLinks = (frameworks) => {
  return (
    <>
      {frameworks.map((framework, index) => (
        <React.Fragment key={index}>
          {index > 0 && ", "}
          <a
            href={framework.url || "#"}
            className="framework-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {framework.name}
          </a>
        </React.Fragment>
      ))}
    </>
  );
};

const FrameworkChooser = () => {
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [matrixData, setMatrixData] = useState([]);

  // Fetch the JSON dynamically from the external link
  useEffect(() => {
    fetch(JSON_URL)
      .then((response) => response.json())
      .then((data) => setMatrixData(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  useEffect(() => {
    if (selectedUseCase) {
      setFilteredData(
        matrixData.filter((row) => row["Use case"] === selectedUseCase)
      );
    } else {
      setFilteredData([]);
    }
  }, [selectedUseCase, matrixData]);

  return (
    <div className="framework-chooser-container">
      {/* Dropdown */}
      <div className="dropdown-container">
        <label className="dropdown-label">Select Use Case:</label>
        <div className="custom-dropdown">
          <select
            onChange={(e) => setSelectedUseCase(e.target.value)}
            value={selectedUseCase}
            className="use-case-dropdown"
          >
            <option value="">-- Select --</option>
            {matrixData.map((row, index) => (
              <option key={index} value={row["Use case"]}>
                {row["Use case"]}
              </option>
            ))}
          </select>
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>

      {/* Results */}
      {filteredData.length > 0 && (
        <div className="result-box">
          <h3>Suggested Frameworks and Measures</h3>
          {filteredData.map((row, index) => (
            <div key={index} className="result-card">
              <h4>
                📋{" "}
                {createFrameworkLinks(
                  row["Selection of Commonly Used Framework(s)"]
                )}
              </h4>
              <p>
                <strong>Use Case:</strong> {row["Use case"]}
              </p>
              {createMeasureLinks(row["Highlighted Measures"])}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrameworkChooser;
