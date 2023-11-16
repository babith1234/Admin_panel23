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

    // Check if user is not logged in and fetch data
    if (!user) {
      signInWithDefaultCredentials();
    }

    // Fetch data only if participants are not already loaded
    if (participants.length === 0) {
      fetchData();
    }
  }, [participants, participantsCollection, auth, user]);

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
    backgroundColor:'transparent'
  };

  const thStyle = {
    border: "5px solid orange",
    padding: "10px",
    color: "orange",
    backgroundColor:'transparent'
  };

  const tdStyle = {
    border: "5px solid orange",
    padding: "8px",
    color: "white",
    backgroundColor:'transparent'
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="container-fluid " style={{ backgroundImage: `url(${darkbg4})`, backgroundSize: "cover",overflowX:'hidden',minHeight:"100vh" }}>
        <Navbar />
        <div className="row justify-content-center">
          <div className="col-10 ">
            <h1 className="text-white text-center m-5 p-5">COMPLETE USER'S LIST</h1>
            {user && (
              <input
                type="text"
                className="form-control mb-4"
                placeholder="Search Participant..."
                value={search}
                onChange={handleSearchChange}
                style={{
                  borderRadius: "24px",
                  backgroundColor: "orange",
                }}
              />
            )}
            <div className="d-flex justify-content-center" >
              <table className="table  table-bordered table-hover" style={tableStyle}>
                <thead className="bg-orange text-white">
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
          </div>
        </div>
      </div>
    </>
  );
};


export default FullList;