import React from "react";

export const ContactForm = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        name="name"
        label="Name"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
        placeholder="Contact Name"
      />
      <input
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        name="phone"
        label="Phone"
        type="tel"
        pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
        required
        placeholder="Contact Phone"
      />
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        name="email"
        label="Email"
        type="email"
        required
        placeholder="Contact Email"
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
