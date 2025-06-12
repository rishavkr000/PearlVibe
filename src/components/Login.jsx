import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async () => {
    console.log("Login Button Clicked");
  };
  const handleRegister = async () => {
    console.log("Register Button Clicked");
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
                    onChange={(e) => setLast(e.target.value)}
                  />
                </fieldset>
              </div>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={email}
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
              <p className="text-blue-600 cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>Sign Up</p>
            </div>
          ) : (
            <div className="text-center">
              <p>Already have an account?</p>
              <p className="text-blue-600 cursor-pointer" onClick={() => setIsLoginForm((value) => !value)}>Login</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
