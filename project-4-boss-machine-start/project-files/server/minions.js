const express = require("express");
const app = require("../server");
const minions = express.Router();
const db = require("./db");

app.use("/minions", minions);

function validInput(req, res, next) {
  const { name, title, weaknesses, salary } = req.body;
  if (typeof name !== "string") {
    const err = Error("Invalid name input");
    err.status = 404;
    next(err);
  } else if (typeof title !== "string") {
    const err = Error("Invalid title input");
    err.status = 404;
    next(err);
  } else if (typeof weaknesses !== "string") {
    const err = Error("Invalid weaknesses input");
    err.status = 404;
    next(err);
  } else if (typeof salary !== "number") {
    const err = Error("Invalid salary input");
    err.status = 404;
    next(err);
  }
  next();
}

function validateMinionId(req, res, next) {
  const minionId = req.params.minionId;
  if (isNaN(+minionId)) {
    const err = Error("MinionId is wrong format");
    err.status = 404;
    next(err);
  }
  next();
}

minions.get("/", (req, res, next) => {
  const getAllFromDatabase = db.getAllFromDatabase;
  const allMinions = getAllFromDatabase("minions");
  if (allMinions !== null) {
    res.status(200).send(allMinions);
  } else {
    const err = Error("invalid argument supplied");
    err.status = 404;
    next(err);
  }
});

minions.post("/", validInput, (req, res, next) => {
  const addToDatabase = db.addToDatabase;
  const newMinion = addToDatabase("minions", {
    name: req.body.name,
    title: req.body.title,
    weaknesses: req.body.weaknesses,
    salary: req.body.salary,
  });
  if (newMinion !== undefined) {
    res.status(201).send(newMinion);
  } else {
      const err = Error('something wrong määäääh');
      err.status=404;
      next(err);
  }
});

minions.get("/:minionId", validateMinionId, (req, res, next) => {
  const getFromDatabaseById = db.getFromDatabaseById;
  const requestedMinion = getFromDatabaseById("minions", req.params.minionId);
  if (requestedMinion) {
    res.status(200).send(requestedMinion);
  } else {
    const err = Error("Minion with your selected ID does not exist");
    err.status = 404;
    next(err);
  }
});

minions.put("/:minionId", validInput, validateMinionId, (req, res, next) => {
  const updateInstanceInDatabase = db.updateInstanceInDatabase;
  const updatedMinion = updateInstanceInDatabase("minions", {
    id: req.params.minionId,
    name: req.body.name,
    title: req.body.title,
    weaknesses: req.body.weaknesses,
    salary: req.body.salary,
  });
  if (updatedMinion !== null) {
    res.status(200).send(updatedMinion);
  } else {
    const err = Error("Selected Id does not exist");
    err.status = 404;
    next(err);
  }
});

minions.delete("/:minionId", validateMinionId, (req, res, next) => {
  const deleteFromDatabasebyId = db.deleteFromDatabasebyId;
  const deletedMinion = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deletedMinion) {
    res.status(204).send("minion successfully deleted");
  } else {
    const err = Error("Selected Id not found");
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

module.exports = minions;
