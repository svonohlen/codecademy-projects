const express = require("express");
const app = require("../server");
const ideas = express.Router();
const db = require("./db");
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

app.use("/ideas", ideas);

function validInput(req, res, next) {
    const { name, description, weeklyRevenue, numWeeks } = req.body;
    if (typeof name !== "string") {
      const err = Error("Invalid name input");
      err.status = 404;
      next(err);
    } else if (typeof description !== "string") {
      const err = Error("Invalid title input");
      err.status = 404;
      next(err);
    } else if (typeof weeklyRevenue !== "number") {
      const err = Error("Invalid weaknesses input");
      err.status = 404;
      next(err);
    } else if (typeof numWeeks !== "number") {
      const err = Error("Invalid salary input");
      err.status = 404;
      next(err);
    }
    next();
  };

  function validateIdeasId(req, res, next) {
    const ideaId = req.params.ideaId;
    if (isNaN(+ideaId)) {
      const err = Error("IdeaId is wrong format");
      err.status = 404;
      next(err);
    }
    next();
  }

ideas.get("/", (req, res, next) => {
  const getAllFromDatabase = db.getAllFromDatabase;
  const allIdeas = getAllFromDatabase("ideas");
  if (allIdeas !== null) {
    res.status(200).send(allIdeas);
  } else {
    const err = Error("invalid argument supplied");
    err.status = 404;
    next(err);
  }
});

ideas.post('/', validInput, checkMillionDollarIdea, (req, res, next) => {
    const addToDatabase = db.addToDatabase;
    const newIdea = addToDatabase("ideas", {
      name: req.body.name,
      description: req.body.description,
      weeklyRevenue: req.body.weeklyRevenue,
      numWeeks: req.body.numWeeks,
    });
    if (newIdea !== undefined) {
      res.status(201).send(newIdea);
    }
    else {
        const err = Error('something wrong määäääh');
        err.status=404;
        next(err);
    }
  });

  ideas.get('/:ideaId', validateIdeasId, (req, res, next) => {
    const getFromDatabaseById = db.getFromDatabaseById;
    const requestedIdea = getFromDatabaseById("ideas", req.params.ideaId);
    if (requestedIdea) {
      res.status(200).send(requestedIdea);
    } else {
      const err = Error("Idea with your selected ID does not exist");
      err.status = 404;
      next(err);
    }
  });

  ideas.put('/:ideaId', validInput, validateIdeasId, checkMillionDollarIdea, (req, res, next) => {
    const updateInstanceInDatabase = db.updateInstanceInDatabase;
    const updatedIdea = updateInstanceInDatabase("ideas", {
      id: req.params.ideaId,
      name: req.body.name,
      description: req.body.description,
      weeklyRevenue: req.body.weeklyRevenue,
      numWeeks: req.body.numWeeks,
    });
    if (updatedIdea !== null) {
      res.status(200).send(updatedIdea);
    } else {
      const err = Error("Selected Id does not exist");
      err.status = 404;
      next(err);
    }
  });

  ideas.delete('/:ideaId', validateIdeasId, (req, res, next) => {
    const deleteFromDatabasebyId = db.deleteFromDatabasebyId;
    const deletedIdea = deleteFromDatabasebyId("ideas", req.params.ideaId);
    if (deletedIdea) {
      res.status(204).send("idea successfully deleted");
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

module.exports = ideas;
