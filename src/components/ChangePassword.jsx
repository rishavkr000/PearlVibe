import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/changePassword",
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );
      toast.success("Password updated successfully");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent text-black flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-6 text-gray-600 hover:text-black text-4xl font-bold cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            className="border p-2 mb-2 w-full rounded"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="border p-2 mb-2 w-full rounded"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="border p-2 mb-2 w-full rounded"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="text-red-500 mb-2">{error}</div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full cursor-pointer"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
