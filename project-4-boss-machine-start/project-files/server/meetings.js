const express = require("express");
const app = require("../server");
const meetings = express.Router();
const db = require("./db");

app.use("/meetings", meetings);

function validInput(req, res, next) {
  const { time, date, day, note } = req.body;
  if (typeof time !== "string") {
    const err = Error("Invalid time input");
    err.status = 404;
    next(err);
  } else if (date instanceof Date) {
    const err = Error("Invalid date input");
    err.status = 404;
    next(err);
  } else if (typeof day !== "string") {
    const err = Error("Invalid day input");
    err.status = 404;
    next(err);
  } else if (typeof note !== "string") {
    const err = Error("Invalid note input");
    err.status = 404;
    next(err);
  }
  next();
}

meetings.get("/", (req, res, next) => {
  const getAllFromDatabase = db.getAllFromDatabase;
  const allMeetings = getAllFromDatabase("meetings");
  if (allMeetings !== null) {
    res.status(200).send(allMeetings);
  } else {
    const err = Error("invalid argument supplied");
    err.status = 404;
    next(err);
  }
});

meetings.post("/", (req, res, next) => {
  const createMeeting = db.createMeeting;
  const addToDatabase = db.addToDatabase;
  const newMeeting = createMeeting();

  const addedMeeting = addToDatabase("meetings", newMeeting);
  if (addedMeeting !== undefined) {
    res.status(201).send(addedMeeting);
  } else {
    const err = Error("something wrong määäääh");
    err.status = 404;
    next(err);
  }
});

meetings.delete("/", (req, res, next) => {
  const deleteAllFromDatabase = db.deleteAllFromDatabase;
  const emptyArray = deleteAllFromDatabase("meetings");
  if (emptyArray.length === 0) {
    res.status(204).send("deletion of all meetings successful");
  } else {
    const err = Error("Deletion could not be executed");
    err.status = 404;
    next(err);
  }
});

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send(err.message);
  }
};

app.use(errorHandler);

module.exports = meetings;
