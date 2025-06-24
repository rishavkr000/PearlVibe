import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const email = import.meta.env.VITE_EMAILID;
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const street = import.meta.env.VITE_STREET_ADDRESS;
  const city_state = import.meta.env.VITE_CITY_STATE;
  const pincode = import.meta.env.VITE_PINCODE;

  const handleSubmit = (e) => {
    e.preventDefault();
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
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            <input
              type="text"
              placeholder="Email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                setPhone(onlyNums);
              }}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            <textarea
              type="text"
              placeholder="Enter your message"
              value={message}
              rows={1}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 rounded-2lg m-1 w-full"
            />
            <button className="bg-primary p-3 mx-1 my-4 text-center w-full cursor-pointer rounded-md">
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
