const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const { sendSuccess } = require("./shared/utils/apiResponse");
const errorHandler = require("./shared/middlewares/errorHandler");
const notFound = require("./shared/middlewares/notFound");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);



app.use(notFound);
app.use(errorHandler);


module.exports = app;
