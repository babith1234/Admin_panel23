import Navbar from "../Navbar/Navbar";
import Select from "react-select";
import { useState } from "react";
import darkbg4 from "../Signup/darkbg4.jpeg";
import "./userlist.css";

const UserData = () => {
  const data = [
    { value1: "A1", value2: "B1", value3: "C1" },
    { value1: "A2", value2: "B2", value3: "C2" },
    { value1: "A3", value2: "B3", value3: "C3" },
  ];
  const options = [
    { value: "Item 1", label: "UI battles" },
    { value: "Item 2", label: "Code Quest" },
    { value: "Item 3", label: "Sky Dive" },
    { value: "Item 4", label: "Cad carnival" },
    { value: "Item 5", label: "Bot Sumo" },
    { value: "Item 6", label: "Lift off" },
    { value: "Item 7", label: "Line follower" },
    { value: "Item 8", label: "Robo soccer" },
    { value: "Item 9", label: "Terraglide" },
    { value: "Item 10", label: "Eclash" },
    { value: "Item 11", label: "Firepower" },
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
    color: "orange",
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
        <center>
          {" "}
          <h1 style={{ color: "white", position: "relative", top: "20vh" }}>
            PARTICIPANT DETAILS
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
            backgroundColor: "orange",
          }}
        />
        <br></br>
        <br></br>
        {/* <table style={tableStyle}>
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
        </table> */}
        <div className="parent d-flex m-2">
          <div
            className="details  text-white m-2 p-5"
            style={{ width: "50%", height: "auto" }}
          >
            <h2>DETAILS </h2>
            <br></br>
            <br></br>
            <div className="sub-heading">
              <h3>Name: Babith</h3>
            </div>
            <br></br>
            <br></br>
            <h2>EVENT LIST</h2>
            <ul>
              <li>UI BATTLES</li>
              <li>CODE QUEST</li>
            </ul>
          </div>
          <div
            className="entry  text-white m-2 p-5"
            style={{ width: "50%", height: "auto" }}
          >
            <h2> ADD EVENTS</h2>
            <center>
              {" "}
              <h1 className="text-white">Event List</h1>
            </center>
            <Select
              options={options}
              placeholder="Select an Event..."
              isSearchable
              styles={{
               
                option: (styles) => {
                  return {
                    ...styles,
                    color: "black",
                  };
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
