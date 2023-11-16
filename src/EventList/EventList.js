import { useEffect, useState } from "react";
import "./EventList.css";
import Navbar from "../Navbar/Navbar";
import React from "react";
import Select from "react-select";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import darkbg4 from "../Signup/darkbg4.jpeg";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const db = getFirestore();

// Define a function to fetch user data based on UID
const fetchUserData = async (uid) => {
  try {
    const userDocRef = doc(collection(db, "Participant"), uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // Add the UID field to the data with the value of doc.id
      const userData = userDocSnapshot.data();
      userData.UID = userDocSnapshot.id;
      return userData;
    } else {
      // Handle the case when the document doesn't exist
      console.log("User document does not exist.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);

    throw error;
  }
};

const EventList = () => {
  const [user, setUser] = useState(null); // To track user authentication status
  // State to store events from Firestore
  const [events, setEvents] = useState([]);
  // State to store selected event
  const [selectedEvent, setSelectedEvent] = useState(null);
  // State to store participants' UIDs
  const [participants, setParticipants] = useState([]);
  // State to store user data
  const [userData, setUserData] = useState([]);

  console.log(events);
  console.log(selectedEvent);

  const auth = getAuth();

  // Authentication function
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

  // Function to fetch user data for the given UIDs

  const fetchUserDetailsForParticipants = async (uids) => {
    try {
      const userDataPromises = uids.map(async (uid) => {
        const userData = await fetchUserData(uid);

        if (userData) {
          // Fetch user's events data
          const eventsDataSnapshot = await getDocs(
            collection(db, `Participant/${uid}/events`)
          );

          const selectedEventData = eventsDataSnapshot.docs
            .filter((doc) => doc.id === selectedEvent?.value) // Filter based on the selected event ID
            .map((doc) => doc.data());

          // Add the selected event data to the user's data
          userData.events = selectedEventData;

          return userData;
        } else {
          return null;
        }
      });

      const userDataArray = await Promise.all(userDataPromises);
      setUserData(userDataArray);
    } catch (error) {
      console.error("Error fetching user details for participants:", error);
    }
  };

  useEffect(() => {
    signInWithDefaultCredentials();
  }, []);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventListRef = collection(db, "EventList");
        const eventListSnapshot = await getDocs(eventListRef);
  
        console.log("EventList Snapshot:", eventListSnapshot.docs);
  
        // const eventOptions = eventListSnapshot.docs.map((doc) => ({
        //   value: doc.data().eventName,  // Assuming eventName is a field in your document
        //   label: doc.data().eventName,
        // }));

        const eventOptions = eventListSnapshot.docs.map((doc) => ({
          value: doc.id,
          label: doc.id,
        }));
        
        
  
        console.log("Event Options:", eventOptions);
  
        setEvents(eventOptions);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();
  }, []);
  
  

  // Fetch participants when a specific event is selected

  useEffect(() => {
    if (selectedEvent) {
      const fetchParticipants = async () => {
        try {
          const eventListRef = collection(db, "EventList");
          const selectedEventDocRef = doc(eventListRef, selectedEvent.value);
          const participantListRef = collection(selectedEventDocRef, "List");

          const participantListSnapshot = await getDocs(participantListRef);

          console.log(participantListSnapshot);

          const participantData = participantListSnapshot.docs.map(
            (doc) => doc.id
          );
          console.log(participantData);
          setParticipants(participantData);
        } catch (error) {
          console.error("Error fetching participants:", error);
        }
      };

      fetchParticipants();
    } else {
      setParticipants([]);
    }
  }, [selectedEvent]);

  // Fetch user data for participants when "participants" state changes
  useEffect(() => {
    if (participants.length > 0) {
      fetchUserDetailsForParticipants(participants);
    } else {
      // Reset the user data if no participants are selected
      setUserData([]);
    }
  }, [participants]);

  const tableStyle = {
    border: "5px solid yellow",
    borderCollapse: "collapse",
    width: "100vw",
    marginTop: "15vh",
  };

  const thStyle = {
    border: "5px solid orange",
    padding: "10px",
    color: "white",
  };

  const tdStyle = {
    border: "5px solid orange",
    padding: "8px",
    color: "orange"

  };

  const thStyle1 = {
    padding: "10px",
    color: "black",
  };

  const tdStyle1 = {
    padding: "8px",
  

  };

  return (
    <div>
      <div
        style={{
          background: `url(${darkbg4})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <center>
          <h1 style={{ color: "white", position: "relative", top: "20vh" }}>
            EVENT LIST
          </h1>
        </center>

        <Select
          options={events}
          placeholder="Select an Event..."
          isSearchable
          value={selectedEvent}
          onChange={setSelectedEvent}
          className="custom-select"
        />

<table id="table" style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>SNO</th>
              <th style={thStyle}>UID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>College</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Team Members</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((participant, index) => (
              <tr key={participant.UID}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{participant.UID}</td>
                <td style={tdStyle}>{participant.Name}</td>
                <td style={tdStyle}>{participant.Email}</td>
                <td style={tdStyle}>{participant.College}</td>
                <td style={tdStyle}>{participant.Contact}</td>
                <td style={tdStyle}>
                  {participant.events &&
                    participant.events.map((event, index) => (
                      <div key={index}>
                        {Object.keys(event.teamMembers).map((memberKey) => (
                          <div key={memberKey}>
                           {event.teamMembers[memberKey]}
                          </div>
                        ))}
                      </div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table id="table-to-xls" style={tableStyle}>
          <thead>
            <tr>
             
              <th style={thStyle1}>UID</th>
              <th style={thStyle1}>Name</th>
              <th style={thStyle1}>Email</th>
              <th style={thStyle1}>College</th>
              <th style={thStyle1}>Contact</th>
             
            </tr>
          </thead>
          <tbody>
            {userData.map((participant, index) => (
              <React.Fragment key={participant.UID}>
               
                {/* Additional rows for each team member */}
                {participant.events &&
                  participant.events.map((event, eventIndex) => (
                    Object.keys(event.teamMembers).map((memberKey, memberIndex) => (
                      <tr key={`${participant.UID}-${eventIndex}-${memberIndex}`}>
                      
                        <td style={tdStyle1}>{participant.UID}</td>
                        <td style={tdStyle1}>
                          <div key={memberKey}>
                            {event.teamMembers[memberKey]}
                          </div>
                        </td>
                        <td style={tdStyle1}>{participant.Email}</td>
                        <td style={tdStyle1}>{participant.College}</td>
                        <td style={tdStyle1}>{participant.Contact}</td>
                       
                      </tr>
                    ))
                  ))}
              </React.Fragment>
            ))}
          </tbody>

        </table>

        <div  className="float-end m-3 "   style={{
          background: `url(${darkbg4})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width:"100%",
          padding:"10px"
        }}>
          <ReactHTMLTableToExcel
            id={`exportButton`}
            className="download-table-xls-button p-2 rounded bg-warning"
            table="table-to-xls"
            filename={selectedEvent?.label}
            sheet="tablexls"
            buttonText="Export All Data"
          />
        </div>
      </div>
    </div>
  );
};

export default EventList;