// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import logo from "./logo.png";
// // import { useAuth } from "../firebaseAuth/authContext";
// // import { signOut } from "firebase/auth";
// // import { useNavigate } from "react-router-dom";
// // import { auth } from "../firebaseAuth/auth";

// const Navbar = () => {
//   //   const { currentUser, setCurrentUser } = useAuth();
//   //   const navigate = useNavigate();
//   return (
//     <>
//       <nav className="navbar navbar-custom navbar-expand-lg  fixed-top">
//         <div className="container-fluid">
//           <a className="navbar-brand navbar-brand-custom" href="#">
//             <img src={logo} alt="Logo" className="logo"></img>
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon navbar-toggler-icon-custom"></span>
//           </button>
//           <div
//             className="collapse navbar-collapse "
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav navbar-nav-custom    ms-lg-auto small-screen">
//               <li className="nav-item m-3">
//                 <Link
//                   to="/"
//                   className="text-decoration-none p-3"
//                   style={{ color: "white" }}
//                 >
//                   HOME
//                 </Link>
//               </li>
//               <li className="nav-item m-3">
//                 <Link
//                   to="/fulllist"
//                   className="text-decoration-none p-3"
//                   style={{ color: "white" }}
//                 >
//                   COMPLETE LIST
//                 </Link>
//               </li>
//               <li className="nav-item m-3">
//                 <Link
//                   to="/userlist"
//                   className="text-decoration-none p-3"
//                   style={{ color: "white" }}
//                 >
//                   USER-LIST
//                 </Link>
//               </li>
//               <li className="nav-item nav-item-custom m-3">
//                 <Link
//                   to="/"
//                   className="text-decoration-none p-3"
//                   style={{ color: "white" }}
//                 >
//                   EVENT-LIST
//                 </Link>
//               </li>

//               {/* {currentUser ? (
//                 <li className="nav-item nav-item-custom">
//                   <button
//                     type="button"
//                     className="btn m-2 glow-on-hover reg-btn "
//                     onClick={async () => {
//                       await signOut(auth).then(() => {
//                         navigate("/");
//                         console.log("logged out");
//                       });
//                       setCurrentUser(null);
//                     }}
//                   >
//                     <Link
//                       to="/"
//                       className="text-decoration-none m-1 "
//                       style={{ color: "white" }}
//                     >
//                       LOGOUT
//                     </Link>
//                   </button>
//                 </li>
//               ) : (
//                 <> */}
//               <li className="nav-item">
//                 <button type="button" className="btn m-2 glow-on-hover lg-btn">
//                   <Link
//                     to="/register"
//                     className="text-decoration-none"
//                     style={{ color: "white" }}
//                   >
//                     REGISTER
//                   </Link>
//                 </button>
//               </li>
//               {/* </>
//               )} */}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/aerophilia.png";
import { useAuth } from "../firebaseAuth/authContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseAuth/auth";
import { useState, useEffect } from "react";
import mobileImage from "../images/mobileimage.png";

const Navbar = () => {
  const hideAlert = () => {
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
  };

  const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    setTimeout(hideAlert, 3000);
  };
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  return (
    <>
      <nav className="navbar navbar-custom nav navbar-expand-lg  fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand navbar-brand-custom" href="#">
            <img
              src={logo}
              alt="Desktop Logo"
              className="logo d-none d-md-block"
            ></img>
            <img
              src={mobileImage}
              alt="Mobile Logo"
              className="logo d-md-none"
            ></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav navbar-nav-custom  ms-auto mb-2 mb-lg-0 ms-auto small-screen">
              <li
                className={`nav-item m-3 ${activeLink === "/" ? "active" : ""}`}
              >
                <Link
                  to="/"
                  className="text-decoration-none p-3"
                  style={{ color: "white" }}
                  onClick={() => handleLinkClick("/")}
                >
                  HOME
                </Link>
              </li>
              <li
                className={`nav-item m-3 ${
                  activeLink === "/courses" ? "active" : ""
                }`}
              >
                <Link
                  to="/fulllist"
                  className="text-decoration-none p-3"
                  style={{ color: "white" }}
                  onClick={() => handleLinkClick("/courses")}
                >
                  COMPLETE LIST
                </Link>
              </li>
              <li
                className={`nav-item m-3 ${
                  activeLink === "/gallery" ? "active" : ""
                }`}
              >
                <Link
                  to="/userlist"
                  className="text-decoration-none p-3"
                  style={{ color: "white" }}
                  onClick={() => handleLinkClick("/gallery")}
                >
                  USER-LIST
                </Link>
              </li>
              <li
                className={`nav-item m-3 ${
                  activeLink === "/about" ? "active" : ""
                }`}
              ></li>

              {currentUser ? (
                <li>
                  <button
                    type="button"
                    className="btn m-2 text-lg glow-on-hover register-btn"
                    onClick={async () => {
                      await signOut(auth).then(() => {
                        navigate("/");
                        console.log("logged out");
                      });
                      setCurrentUser(null);
                      showAlert("error", "You have logged out successfully");
                    }}
                  >
                    <Link
                      to="/login"
                      className="text-decoration-none m-1"
                      style={{ color: "white" }}
                    >
                      LOGOUT
                    </Link>
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button type="button" className="btn m-3 glow-on-hover ">
                      <Link
                        to="/login"
                        className="text-decoration-none"
                        style={{ color: "white" }}
                      >
                        LOGIN
                      </Link>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="btn m-3 glow-on-hover ">
                      <Link
                        to="/register"
                        className="text-decoration-none"
                        style={{ color: "white" }}
                      >
                        REGISTER
                      </Link>
                    </button>
                  </li>

                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
