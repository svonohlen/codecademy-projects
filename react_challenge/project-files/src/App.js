import React, { useState } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {
  const [contacts, setContacts] = useState([
    {
      name: "1",
      phone: "1",
      email: "1",
    },
    {
      name: "2",
      phone: "2",
      email: "2",
    },
  ]);

  const addContact = (name, phone, email) => {
    setContacts((prev) => [...prev, { name, phone, email }]);
  };

  const [appointments, setAppointments] = useState([
    {
      title: "1",
      contact: "1",
      date: "1",
      time: "1",
    },
    {
      title: "2",
      contact: "2",
      date: "2",
      time: "2",
    },
  ]);

  const addAppointment = (title, contact, date, time) => {
    setAppointments((prev) => [...prev, { title, contact, date, time }]);
  };

  /*
  Define state variables for 
  contacts and appointments 
  */

  const ROUTES = {
    CONTACTS: "/contacts",
    APPOINTMENTS: "/appointments",
  };

  /*
  Implement functions to add data to
  contacts and appointments
  */

  return (
    <>
      <nav>
        <NavLink to={ROUTES.CONTACTS} activeClassName="active">
          Contacts
        </NavLink>
        <NavLink to={ROUTES.APPOINTMENTS} activeClassName="active">
          Appointments
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to={ROUTES.CONTACTS} />
          </Route>
          <Route path={ROUTES.CONTACTS}>
            {/* Add props to ContactsPage */}
            <ContactsPage contacts={contacts} addContact={addContact} />
          </Route>
          <Route path={ROUTES.APPOINTMENTS}>
            {/* Add props to AppointmentsPage */}
            <AppointmentsPage
              appointments={appointments}
              contacts={contacts}
              addAppointment={addAppointment}
            />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
