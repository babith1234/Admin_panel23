import React, { useState } from "react";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import darkbg4 from "../Signup/darkbg4.jpeg";

import "./EventList.css";

const EventList = () => {
  const allParticipants = [
    // Replace this with your actual data
    { SNO: 0, UID: 1, NAME: "Alice", COLLEGE: "ST JOSEPH", CONTACT: "123-456-7890", TEAM: "" },
    { SNO: 1, UID: 2, NAME: "Bob", COLLEGE: "ABC University", CONTACT: "987-654-3210", TEAM: "Team A" },
    // Add more participants
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

  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredParticipants, setFilteredParticipants] = useState(allParticipants);

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
    if (selected) {
      // Filter participants based on the selected event
      const filteredData = allParticipants.filter((participant) => {
        // Replace 'selected.value' with the actual field you want to match
        return participant.UID === selected.value;
      });
      setFilteredParticipants(filteredData);
    } else {
      // If nothing is selected, show all participants
      setFilteredParticipants(allParticipants);
    }
  };

  const tableStyle = {
    border: "5px solid yellow",
    borderCollapse: "collapse",
    width: "100vw",
  };

  const thStyle = {
    border: "5px solid orange",
    padding: "10px",
    color: "white",
  };

  const tdStyle = {
    border: "5px solid orange",
    padding: "8px",
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
        <br />
        <br />
        <br />
        <br />
        <div className="event-list ">
          <center>
            {" "}
            <h1 className="text-white">Event List</h1>
          </center>
          <Select
            options={options}
            placeholder="Select an Event..."
            isSearchable
            value={selectedOption}
            onChange={handleSelectChange}
          />
          <br />
          <input
            type="text"
            placeholder="Search Participant..."
            style={{
              marginTop: "",
              width: "100vw",
              padding: "10px",
              borderRadius: "24px",
              backgroundColor: "orange",
            }}
          />
          <br></br>
          <br></br>
        </div>
        <div style={{ overflowX: "auto", maxWidth: "100vw" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>SNO</th>
                <th style={thStyle}>UID</th>
                <th style={thStyle}>NAME</th>
                <th style={thStyle}>COLLEGE</th>
                <th style={thStyle}>CONTACT</th>
                <th style={thStyle}>TEAM</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant) => (
                <tr key={participant.UID}>
                  <td style={tdStyle}>{participant.SNO}</td>
                  <td style={tdStyle}>{participant.UID}</td>
                  <td style={tdStyle}>{participant.NAME}</td>
                  <td style={tdStyle}>{participant.COLLEGE}</td>
                  <td style={tdStyle}>{participant.CONTACT}</td>
                  <td style={tdStyle}>{participant.TEAM}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EventList;
