import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const DeactivateAccount = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const handleAccountDeactivate = async () => {
    try {
      await axios.patch(
        import.meta.env.VITE_BACKEND_URL + "/deactivateAccount",
        {},
        { withCredentials: true }
      );
      toast.success("Account deactivated successfully");

      // 3. Wait a bit so toast shows, then logout
      setTimeout(async () => {
        try {
          await axios.get(import.meta.env.VITE_BACKEND_URL + "/logout", {
            withCredentials: true,
          });

          // 4. Redirect user to login page
          navigate("/login");
        } catch (logoutErr) {
          console.error("Logout failed:", logoutErr);
        }
      }, 1500); // delay for toast display
    } catch (err) {
      console.error("Deactivation failed:", err);
      toast.error("Something went wrong while deactivating the account");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 text-black flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-6 text-gray-600 hover:text-black text-4xl font-bold cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Deactivate Account</h2>
        <div className="bg-blue-100 rounded-lg p-4 text-sm text-gray-700 mb-6 space-y-3">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            ⚠️ Important Information Before You Deactivate Your Account
          </h3>

          <p>
            🔒 <strong>Your account will not be permanently deleted.</strong> It
            will only be temporarily deactivated, and your profile will be
            hidden from others.
          </p>

          <p>
            🕒 <strong>You can reactivate your account anytime.</strong> Just
            log in again using your registered email and correct password.
          </p>

          <p>
            🙈{" "}
            <strong>
              While deactivated, your activity and data will be invisible.
            </strong>{" "}
            Other users will not be able to view your profile or content.
          </p>

          <p>
            🚪 <strong>You will be logged out immediately.</strong> All active
            sessions across devices will be closed as soon as deactivation
            occurs.
          </p>

          <p>
            🛟 <strong>Need help reactivating?</strong> If you face any trouble
            accessing your account later, feel free to contact our support team.
          </p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleAccountDeactivate}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 cursor-pointer"
          >
            Deactivate Account
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateAccount;
