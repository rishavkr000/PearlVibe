import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login isLoginForm={true} />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
          <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
