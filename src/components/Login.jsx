import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const data = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/signIn",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(data.data.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const handleRegister = async () => {
    setError("");
    try {
      const data = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/signUp",
        {
          firstName,
          lastName,
          emailId,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      );
      dispatch(addUser(data.data.data));
      navigate("/");
    } catch (err) {
      if (
        err.response.data.message ==
        "Error:User validation failed: firstName: Path `firstName` is required."
      ) {
        setError("First Name is required");
      } else if (err.response.data.message == "User already exists") {
        setError("Email already register");
      } else if (
        err.response.data.message ==
        "Error:Please provide all the required fields"
      ) {
        setError("Please provide all the required fields");
      } else if (err.response.data.message == "Error:Passwords do not match") {
        setError("Passwords do not match");
      } else if (
        err.response.data.message ==
        "Error:Password must be at least 8 characters and include symbols"
      ) {
        setError("Password must be at least 8 characters and include symbols");
      } else if (err.response.data.message == "Error:Email Id is not valid") {
        setError("Email Id is not valid");
      } else {
        setError(err.response.data.message);
      }
      console.log(err.response.data);
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
            <fieldset className="fieldset relative">
              <legend className="fieldset-legend">Password</legend>
              <input
                type={showPassword ? "text" : "password"}
                className="input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 pr-5 z-10"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </fieldset>
            {!isLoginForm && (
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 pr-5 z-10"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </fieldset>
            )}
          </div>
          <div className="text-red-500">{error}</div>
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
                onClick={() => {
                  setError(""), setIsLoginForm((value) => !value);
                }}
              >
                Sign Up
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p>Already have an account?</p>
              <p
                className="text-blue-600 cursor-pointer"
                onClick={() => {
                  setError(""), setIsLoginForm((value) => !value);
                }}
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
