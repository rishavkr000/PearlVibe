import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const email = import.meta.env.VITE_EMAILID;
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const street = import.meta.env.VITE_STREET_ADDRESS;
  const city_state = import.meta.env.VITE_CITY_STATE;
  const pincode = import.meta.env.VITE_PINCODE;

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPhone = (number) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Client-side validation
    if (!name || !emailId || !phone || !subject || !message) {
      setError("Please fill out all fields.");
      return;
    }

    if (!isValidEmail(emailId)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError(
        "Please enter a valid Indian phone number (10 digits, starts with 6-9)."
      );
      return;
    }

    try {
      const emailData = {
        name,
        emailId,
        phone,
        subject,
        message,
      };

      const data = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/send_email",
        emailData,
        { withCredentials: true }
      );
      console.log(data);
      toast("Email send successfully");
      setName("");
      setEmailId("");
      setPhone("");
      setSubject("");
      setMessage("");
      setError("");
    } catch (err) {
      console.log(
        err.response.data.err || "Something went wrong while sending the email."
      );
      setError(
        err.response.data.err || "Something went wrong while sending the email."
      );
      toast(
        err.response.data.err || "Something went wrong while sending the email."
      );
    }
  };
  return (
    <section id="contact" className="bg-background">
      <div className="flex justify-center mx-10">
        <h1 className="text-4xl font-bold mt-3">Contact Us</h1>
      </div>
      <p className="text-center pt-4">
        Feel free to contact me through any of these channels, and I'll get back
        to you as soon as possible.
      </p>
      <div className="mx-50 mt-9 flex justify-between">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-blue-600">Address</h2>
          <span>{street}</span>
          <br />
          <span>{city_state}</span>
          <br />
          <span>{pincode}</span>
          <h2 className="text-2xl font-bold text-blue-600 mt-5">Phone</h2>
          <span>{phoneNumber}</span>
          <h2 className="text-2xl font-bold text-blue-600 mt-5">Email</h2>
          <span>{email}</span>
        </div>
        <div className="mb-5">
          <form
            onSubmit={handleSubmit}
            className="w-100 bg-white text-black py-8 px-8"
          >
            <h1 className="text-3xl font-bold mb-5 text-center">
              Send Message
            </h1>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            <input
              type="text"
              required
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                setPhone(onlyNums);
              }}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            <input
              type="text"
              required
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            <textarea
              type="text"
              required
              placeholder="Enter your message"
              value={message}
              rows={1}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            {error && (
              <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
            )}
            <button className="bg-primary p-3 mx-1 my-4 text-center w-full cursor-pointer rounded-md">
              Send
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
