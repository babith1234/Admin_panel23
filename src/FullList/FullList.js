import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import darkbg4 from "../Signup/darkbg4.jpeg";

const FullList = () => {
  const data = [
    { value1: "A1", value2: "B1", value3: "C1" },
    { value1: "A2", value2: "B2", value3: "C2" },
    { value1: "A3", value2: "B3", value3: "C3" },
  ];
  const tableStyle = {
    border: "5px solid yellow",
    borderCollapse: "collapse",
    width: "100vw",

    // marginLeft: "25vw",
    // marginTop: "25vh",
  };

  const thStyle = {
    border: "5px solid yellow",
    padding: "10px",
    color: "yellow",
  };

  const tdStyle = {
    border: "5px solid yellow",
    padding: "8px",
  };
  const [search, setSearch] = useState("");

  const filteredData = data.filter((row) => {
    // Customize this condition to filter based on your specific data structure
    return (
      row.value1.toLowerCase().includes(search.toLowerCase()) ||
      row.value2.toLowerCase().includes(search.toLowerCase()) ||
      row.value3.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        style={{
          background: `url(${darkbg4})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Navbar />
      <center> <h1 style={{ color: "white",position:"relative",top:"20vh" }}>
        
      
          COMPLETE USER'S LIST
          </h1>
          </center> 
        <input
          type="text"
          placeholder="Search Participant..."
          value={search}
          onChange={handleSearchChange}
          style={{
            marginTop: "20vh",
            width: "100vw",
            padding: "10px",
            borderRadius: "24px",
            backgroundColor:"yellow"
          }}
        />
        <br></br>
        <br></br>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>UID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>CONTACT</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td style={tdStyle}>{row.value1}</td>
                <td style={tdStyle}>{row.value2}</td>
                <td style={tdStyle}>{row.value3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FullList;
