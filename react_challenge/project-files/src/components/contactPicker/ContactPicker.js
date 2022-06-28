import React from "react";

export const ContactPicker = ({ contacts, onChange }) => {
  return (
    <label>
      <select onChange={onChange} name="contacts">
        <option value={""} key={-1} selected disabled hidden>
          Choose here
        </option>
        {contacts.map((name) => {
          return (
            <option key={name} value={name}>
              {name}
            </option>
          );
        })}
      </select>
    </label>
  );
};
