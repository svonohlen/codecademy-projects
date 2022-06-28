const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.get("/quotes/random", (req, res) => {
  res.status(200).send({ quote: getRandomElement(quotes) });
});

apiRouter.get("/quotes", (req, res, next) => {
  console.log(req.query.person);
  if (req.query.person !== undefined) {
    const requestedPersonQuotes = quotes.filter(
      (item) => item.person == req.query.person
    );
    res.status(200).send({ quotes: requestedPersonQuotes });
  } else {
    res.status(200).send({ quotes: quotes });
  }
});

apiRouter.post("/quotes", (req, res, next) => {
  if (req.query.quote && req.query.person) {
    quotes.push(req.query);
    res.status(201).send({ quote: req.query });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log("iam listening");
});
