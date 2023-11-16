import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Signup/Register";
import Login from "./Signup/Login";
import EventList from "./EventList/EventList";
import FullList from "./FullList/FullList";
import UserData from "./Userlist/userlist";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/fulllist" element={<FullList />}></Route>
          <Route path="/userlist" element={<UserData />}></Route>
          <Route path="/EventList" element={<EventList />}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
