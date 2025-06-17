import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmail] = useState("rishav@gmail.com");
  const [password, setPassword] = useState("Rishav@123");
  const [confirmPassword, setConfirmPassword] = useState("Rishav@123")
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("Rishav");
  const [lastName, setLastName] = useState("Kumar");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await axios.post(import.meta.env.VITE_BACKEND_URL + "/signIn", {
        emailId,
        password,
      }, {withCredentials: true});
      dispatch(addUser(data.data.data));
      navigate("/")
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleRegister = async () => {
    try {
      const data = await axios.post("http://localhost:3000/signUp", {
        firstName,
        lastName,
        emailId,
        password,
        confirmPassword
      }, {withCredentials: true});
      console.log(data)
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          {isLoginForm ? (
            <h2 className="card-title justify-center text-2xl">Login</h2>
          ) : (
            <h2 className="card-title justify-center text-2xl">Sign Up</h2>
          )}
          <div>
            {!isLoginForm && (
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </div>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            {!isLoginForm && <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </fieldset>}
          </div>
          {isLoginForm ? (
            <div className="card-actions justify-center my-4">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          ) : (
            <div className="card-actions justify-center my-4">
              <button className="btn btn-primary" onClick={handleRegister}>
                Sign Up
              </button>
            </div>
          )}
          {isLoginForm ? (
            <div className="text-center">
              <p>Don't have an account?</p>
              <p
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                Sign Up
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p>Already have an account?</p>
              <p
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLoginForm((value) => !value)}
              >
                Login
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
