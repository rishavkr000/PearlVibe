import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [emailId, setEmailId] = useState(user?.emailId || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmailId(user.emailId || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditEnable(!isEditEnable);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSave = async () => {
    try {
      setError("");
      if (firstName.length <= 0) {
        setError("First Name is required");
        return;
      }
      if (firstName && firstName.length > 20) {
        setError("First name must not be greater than 20 characters.");
        return;
      }
      if (lastName && lastName.length > 20) {
        setError("Last name must not be greater than 20 characters.");
        return;
      }

      if (phoneNumber && phoneNumber.length != 10) {
        setError("Phone number must be 10 digits");
        return;
      }

      if (!isValidPhoneNumber(phoneNumber)) {
        setError("Please enter a valid 10-digit Indian phone number.");
        return;
      }

      const res = await axios.patch(
        import.meta.env.VITE_BACKEND_URL + "/profile/update",
        {
          firstName,
          lastName,
          phoneNumber,
        },
        { withCredentials: true }
      );
      setIsEditEnable(false);
      toast("Data updated successfully");
      dispatch(addUser(res.data.data));
    } catch (err) {
      setError(err.response.data.message);
      toast(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="card bg-base-300 w-full max-w-3xl mt-10 shadow-sm p-5">
        <div className="card-body flex flex-row ">
          <h2 className="card-title">Personal Information</h2>
          <h2
            onClick={handleEdit}
            className="mx-5 mt-1 text-blue-600 cursor-pointer"
          >
            {!isEditEnable ? "Edit" : "Cancel"}
          </h2>
        </div>
        <div className="mx-6">
          <input
            type="text"
            disabled={!isEditEnable}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border mr-4 p-2"
          />
          <input
            type="text"
            disabled={!isEditEnable}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2"
          />
        </div>
        <div className="card-body flex flex-row ">
          <h2 className="card-title">Email Address</h2>
          <h2 className="card-title mx-23">Phone Number</h2>
        </div>
        <div className="ml-6">
          <input
            type="text"
            disabled
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="border mr-4 p-2"
          />
          <input
            type="text"
            disabled={!isEditEnable}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border mr-4 p-2"
          />
          {isEditEnable && (
            <button
              onClick={handleSave}
              className="bg-primary px-8 py-2 rounded-xs cursor-pointer"
            >
              Save
            </button>
          )}
        </div>
        <div className="mx-6 pt-4 text-red-500">{error}</div>
        <div className="mx-6 my-10">
          <h1 className="mb-5 text-blue-500 cursor-pointer">Change Password</h1>
          <h1 className="text-red-500 cursor-pointer">Deactivate Account</h1>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
