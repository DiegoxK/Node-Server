import express from "express";
import path from "path";
import cors, { CorsOptions } from "cors";
import { logger } from "./middleware/logEvents";
import "dotenv/config";
import errorHandler from "./middleware/errorHandler";

//constants
const app = express();
const PORT = process.env.PORT || 3500;

//=============================== middlewares =========================//
//Custom Logger
app.use(logger);

//Cross Origin Resource Sharing
const whitelist = [""];

const corsOptions: CorsOptions = {
  origin: (requestOrigin, callback) => {
    if (process.env.NODE_ENV === "development") {
      callback(null, true);
    } else if (requestOrigin === undefined || requestOrigin === null) {
      callback(new Error("Invalid Origin"));
    } else if (whitelist.indexOf(requestOrigin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//json responses
app.use(express.json());

//handle urlencoded data (form data)
app.use(express.urlencoded({ extended: false }));

////============================ static files =========================//
app.use(express.static(path.join(__dirname, "public")));

//routes
app.get("^/$|/index(.html)?", (_req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (_req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (_req, res) => {
  res.redirect(301, "/new-page.html");
});

app.all("*", (_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
