import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "../Navbar/Navbar";
import Select from "react-select";
import darkbg4 from "../Signup/darkbg4.jpeg";
import "./userlist.css";

const UserData = () => {
  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [participantDetails, setParticipantDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventName, setSelectedEventName] = useState(null); // Added state
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [team, setTeam] = useState({
    "Member 1": "",
  });
  const [count, setCount] = useState(1);

  const handleChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };

  const increaseCount = () => {
    setTeam({
      ...team,
      [`Member ${count + 1}`]: "",
    });
    setCount(count + 1);
  };

  const decreaseCount = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    if (count > 1) {
      const newTeam = { ...team };
      delete newTeam[`Member ${count}`];
      setTeam(newTeam);
      setCount(count - 1);
    }
  };
  

  const options = [
    { value: 300, label: "UI BATTLES", maxlimit: 3 },
    { value: 400, label: "CODE QUEST", maxlimit: 4 },
    { value: 500, label: "BOT SUMO", maxlimit: 6 },
    { value: 200, label: "FIRE POWER", maxlimit: 3 },
    // ... add more options as needed
  ];

  const fetchData = async (uid) => {
    try {
      const participantRef = doc(db, "Participant", uid);
      const docSnapshot = await getDoc(participantRef);

      if (docSnapshot.exists()) {
        setParticipantDetails({ uid, ...docSnapshot.data() });

        // Fetch events from the "events" subcollection
        const eventsRef = collection(db, "Participant", uid, "events");
        const eventsSnapshot = await getDocs(eventsRef);
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.id, // Assuming the document ID itself is the event name
        }));
        setEvents(eventsData);
      } else {
        setParticipantDetails(null);
      }
    } catch (error) {
      console.error("Error fetching participant details:", error);
    }
  };

  useEffect(() => {
    const signInWithDefaultCredentials = async () => {
      const email = "anudeep@gmail.com"; // Replace with the actual email
      const password = "123456"; // Replace with the actual password

      try {
        const credentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const currentUser = credentials.user;
        setUser(currentUser);
      } catch (error) {
        console.error("Error logging in with default credentials:", error);
      }
    };

    // Check if the user is already authenticated
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      // If not authenticated, sign in with default credentials
      signInWithDefaultCredentials();
    }
  }, [auth, setUser]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchButtonClicked(false); // Reset to false before each search

    if (search && user) {
      console.log("Fetching data for UID:", search);
      fetchData(search);
      setSearchButtonClicked(true);
    }
  };

  const handleEventChange = (selectedOption) => {
    setSelectedEvent(selectedOption);
    setSelectedEventName(selectedOption.label); // Set the selected event name
  };

 // ... (previous code)

async function handleUserWhilePay() {
  try {
    console.log(selectedEvent);

    const db = getFirestore();

    // Construct participant document reference
    const participantRef = doc(db, "Participant", search);
    const docSnap = await getDoc(participantRef);

    if (docSnap.exists()) {
      console.log("Document fetched:", docSnap.data());

      if (selectedEvent) {
        // Construct event document reference inside the events subcollection
        const eventDocRef = doc(db, `Participant/${search}/events/${selectedEventName}`);
        await setDoc(eventDocRef, {
          payment: true,
          report: false,
          signature: "Help Desk",
          teamMembers: team,
          // ... other data
        });

        // Construct event list document reference
        const eventListDocRef = doc(db, `EventList/${selectedEventName}/List/${search}`);
        await setDoc(eventListDocRef, {
          flag: search,
        });

        console.log("Document updated successfully!");

        // Reset the state variables
        setSelectedEvent(null);
        setSelectedEventName(null);
        setTeam({
          "Member 1": "",
        });
        setCount(1);
        setSearch(""); // Reset the search bar
      } else {
        console.log("No selected event!");
      }
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching/updating document:", error);
  }
}

// ... (rest of the code)


  return (
    <>
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
            PARTICIPANT DETAILS
          </h1>
        </center>
        <div  style={{ display: "flex", alignItems: "center", width: "50vw", margin: "21vh auto auto"}}>
  <input
    type="text"
    placeholder="Search Participant by UID..."
    value={search}
    onChange={handleSearchChange}
   
    style={{
      flex:1,
      padding: "10px",
      borderRadius: "24px",
      backgroundColor: "transparent",
      color: "white",
      marginRight: "10px",
      border:'2px solid orange'
    }}
  />
  <button
    onClick={handleSearchButtonClick}
    style={{
      padding: "10px",
      borderRadius: "24px",
      backgroundColor: "green",
      color: "white",
      cursor: "pointer",
    }}
    className="me-auto "
  >
    Search
  </button>
</div>
      
        {participantDetails ? (
          <div className="parent d-flex m-2">
            <div
              className="details text-white m-2 p-5"
              style={{ width: "50%", height: "auto" }}
            >
              <h2 className="text-center">DETAILS </h2>
              <br></br>
              <br></br>
              <div className="sub-heading text-center">
                <h3>Name: {participantDetails.Name}</h3>
                {/* Add more details as needed */}
              </div>
              <br></br>
              <br></br>
              <h2 className="text-center">EVENT LIST</h2>
              {/* <ul>
                {events.map((event, index) => (
                  <li className="text-center" key={index}>{event.name}</li>
                ))}
              </ul> */}
              <ul className=" p-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  {events.map((event, index) => (
    <li className="p-2" key={index}>{event.name}</li>
  ))}
</ul>

            </div>
            <div
              className="entry text-white m-2 p-5"
              style={{ width: "50%", height: "auto" }}
            >
              <h2> ADD EVENTS</h2>
              <center>
                <h1 className="text-white">Event List</h1>
              </center>
              <Select
                options={options}
                placeholder="Select an Event..."
                isSearchable
                onChange={handleEventChange}
                styles={{
                  option: (styles) => {
                    return {
                      ...styles,
                      color: "black",
                    };
                  },
                }}
              />
              {selectedEvent && (
                <>
                  <p style={{ marginTop: "10px" }}>COST: {selectedEvent.value}</p>
                  <h2> TEAM FORM</h2>
                  <form className="team-form">
                    {Object.keys(team).map((member, index) => (
                      <div key={index} className="input-container">
                        <input
                          type="text"
                          name={member}
                          className="input-field text-white white-text border p-2 m-2"
                          placeholder={`Member ${index + 1}`}
                          required
                          onChange={handleChange}
                          value={team[member]}
                          style={{
                            backgroundColor: "transparent",
                          }}
                        />
                      </div>
                    ))}
                    <div className="button-list m-2">
  {Object.keys(team).length < selectedEvent.maxlimit ? (
    <div>
      <button
        className="glow-on-hover m-2  fs-4"
        style={{ width: "15rem" }}
        onClick={increaseCount}
      >
        Add Member
      </button>
    </div>
  ) : (
    <div>
      <button className="glow-on-hover m-2 p-2 fs-4">Max limit reached</button>
    </div>
  )}
  <div>
    <button
      className="glow-on-hover m-2  fs-4"
      style={{ width: "15rem" }}
      onClick={(e) => decreaseCount(e)}
    >
      Remove Member
    </button>
  </div>
  <div>
    <button
      className="glow-on-hover  m-2 fs-4"
      style={{ width: "15rem" }}
      onClick={async (e) => {
        e.preventDefault();
        console.log("Submit button clicked");
        await handleUserWhilePay(); // Call the handleUserWhilePay function
      }}
    >
      Submit
    </button>
  </div>
</div>

                  </form>
                  {/* <button
                    className="glow-on-hover p-2 fs-4"
                    style={{ width: "15rem" }}
                    onClick={async (e) => {
                      e.preventDefault();
                      console.log("Submit button clicked");
                      await handleUserWhilePay(); 
                    }}
                  >
                    Submit
                  </button> */}
                </>
              )}
            </div>
          </div>
        ) : searchButtonClicked ? (
          <div className="text-white">
            Participant not found or details not loaded.
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UserData;
