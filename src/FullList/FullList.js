 
  import React, { useState, useEffect } from "react";
  import { getFirestore, collection, getDocs } from "firebase/firestore";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import Navbar from "../Navbar/Navbar";
  import darkbg4 from "../Signup/darkbg4.jpeg";
  
  const FullList = () => {
    const [user, setUser] = useState(null); // To track user authentication status
    const [participants, setParticipants] = useState([]);
    const [search, setSearch] = useState("");
  
    const db = getFirestore();
    const auth = getAuth();
    const participantsCollection = collection(db, "Participant");
  
    useEffect(() => {
      const signInWithDefaultCredentials = async () => {
        const email = "anudeep@gmail.com"; // Replace with the actual email
        const password = "123456"; // Replace with the actual password
  
        try {
          await signInWithEmailAndPassword(auth, email, password);
          const user = auth.currentUser;
          setUser(user);
        } catch (error) {
          console.error("Error logging in with default credentials:", error);
        }
      };
  
      signInWithDefaultCredentials();
  
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
    }, [participantsCollection, auth]);

    const filteredData = participants.filter((row) => {
      return (
        row.uid.toLowerCase().includes(search.toLowerCase()) ||
        row.Name.toLowerCase().includes(search.toLowerCase()) ||
        row.Contact.toLowerCase().includes(search.toLowerCase())
      );
    });
  
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
      color: "white",
    };
  
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
          {user && (
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
          )}
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
  