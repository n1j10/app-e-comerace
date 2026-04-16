const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./shared/middlewares/errorHandler");
const notFound = require("./shared/middlewares/notFound");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);

app.get("/", (req, res) => {
    return sendSuccess(res, { message: "API is healthy." });
  });
  
app.use(notFound);
app.use(errorHandler);


module.exports = app;
