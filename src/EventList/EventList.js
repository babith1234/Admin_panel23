import { useEffect, useState } from "react";
import "./EventList.css";
import Navbar from "../Navbar/Navbar";
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
      const eventListSnapshot = await getDocs(collection(db, "EventList"));
      const eventOptions = eventListSnapshot.docs.map((doc) => ({
        value: doc.id,
        label: doc.id,
      }));
      setEvents(eventOptions);
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
    color: "white",
  };

  return (
    <div>
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

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>SNO</th>
              <th style={thStyle}>UID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>College</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Team Members</th>{" "}
            </tr>
          </thead>
          <tbody>
            {userData.map((participant, index) => (
              <tr key={participant.UID}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{participant.UID}</td>
                <td style={tdStyle}>{participant.Name}</td>
                <td style={tdStyle}>{participant.College}</td>
                <td style={tdStyle}>{participant.Contact}</td>
                <td style={tdStyle}>
                  {participant.events &&
                    participant.events.map((event, index) => (
                      <div key={index}>
                        {Object.keys(event.teamMembers).map((memberKey) => (
                          <div key={memberKey}>
                            {memberKey}: {event.teamMembers[memberKey]}
                          </div>
                        ))}
                      </div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventList;