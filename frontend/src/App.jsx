import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [logs, setLogs] = useState([]); 
  const [filteredLogs, setFilteredLogs] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [severityFilter, setSeverityFilter] = useState(""); 

  
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-array") 
      .then((response) => response.json())
      .then((data) => {
        setLogs(data);
        setFilteredLogs(data); 
      })
  }, []);

  
  useEffect(() => {
    let filtered = logs;

    if (severityFilter) {
      filtered = filtered.filter(
        (log) => log.log_severity.toLowerCase() === severityFilter.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter(
        (log) =>
          log.message_content.toLowerCase().includes(search.toLowerCase()) ||
          log.node_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  }, [search, severityFilter, logs]);

  return (
    <div className="container">
      <h1>Log Table</h1>

      
      <div className="filters">
        <input
          type="text"
          placeholder="Search by message or node name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
        >
          <option value="">All Severities</option>
          <option value="DEBUG">DEBUG</option>
          <option value="INFO">INFO</option>
          <option value="WARN">WARN</option>
          <option value="ERROR">ERROR</option>
          <option value="FATAL">FATAL</option>
        </select>
      </div>

      <div className="stats">
        <p>Total Logs: {logs.length}</p>
        <p>Filtered Logs: {filteredLogs.length}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Severity</th>
            <th>Node Name</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr
              key={index}
              className={
                log.log_severity === "ERROR" || log.log_severity === "WARN"
                  ? "highlight"
                  : "" 
                
              }
              
            >
              <td>{log.timestamp}</td>
              <td>{log.log_severity}</td>
              <td>{log.node_name}</td>
              <td>{log.message_content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
