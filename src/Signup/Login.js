import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import darkbg4 from "./darkbg4.jpeg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the email and password are both "admin"
    if (email.toLowerCase() === "admin" && password === "admin") {
      alert("Successful login");
      navigate("/fulllist")
      // Perform your navigation or other actions here
    } else {
      setLoginError("Invalid credentials");
    }
  };

  return (
    <div className="mt-4">
      <Navbar />

      <div
        className="login-container login-container-custom"
        style={{
          background: `url(${darkbg4})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginTop: "-25px",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12"></div>
            <div className="col my-5">
              <div className="card p-5  auth-card auth-card-custom content-container">
                <div className="card-body custom-card-body">
                  <center>
                    <h5 className="card-title card-title-custom mb-5 text-white">
                      USER LOGIN
                    </h5>
                  </center>
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      ></label>
                      <input
                        type="email"
                        className="form-control white-text text-white"
                        id="exampleInputEmail1"
                        placeholder="Enter Email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          borderBottom: "2px solid #fff",
                        }}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      ></label>
                      <input
                        type="password"
                        className="form-control white-text text-white"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          borderBottom: "2px solid #fff",
                        }}
                      ></input>
                      {loginError && (
                        <small className="form-text text-danger">
                          {loginError}
                        </small>
                      )}
                    </div>
                  </form>
                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <button
                      type="button"
                      className="btn m-2 glow-on-hover"
                      onClick={handleSubmit}
                      style={{ color: "white" }}
                    >
                      Submit
                    </button>
                    <div className="mb-3">
                      <a
                        href="/register"
                        className="text-muted text-decoration-none"
                      >
                        <p style={{ color: "white" }}> New User? Signup</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
