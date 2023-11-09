import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import darkbg4 from "../Signup/darkbg4.jpeg";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const FullList = () => {
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");

  const db = getFirestore();
  const participantsCollection = collection(db, "Participant");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(participantsCollection);
        const participantData = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        setParticipants(participantData);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchData();
  }, [participantsCollection]);

  const tableStyle = {
    border: "5px solid orange",
    borderCollapse: "collapse",
    width: "100vw",
  };

  const thStyle = {
    border: "5px solid orange",
    padding: "10px",
    color: "orange",
  };

  const tdStyle = {
    border: "5px solid orange",
    padding: "8px",
    color:"white"
  };

  const filteredData = participants.filter((row) => {
    return (
      row.uid.toLowerCase().includes(search.toLowerCase()) ||
      row.Name.toLowerCase().includes(search.toLowerCase()) ||
      row.Contact.toLowerCase().includes(search.toLowerCase())
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
          <h1 style={{ color: "white", position: "relative", top: "20vh" }}>
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
            backgroundColor: "orange",
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
            {filteredData.map((row) => (
              <tr key={row.uid}>
                <td style={tdStyle}>{row.uid}</td>
                <td style={tdStyle}>{row.Name}</td>
                <td style={tdStyle}>{row.Contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FullList;
