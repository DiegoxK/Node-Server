import express from "express";
import path from "path";
import cors from "cors";
import { logger } from "./middleware/logEvents";
import "dotenv/config";
import root from "./routes/root";
import employees from "./routes/api/employees";
import errorHandler from "./middleware/errorHandler";
import corsOptions from "./config/corsOptions";

//constants
const app = express();
const PORT = process.env.PORT || 3500;

//=============================== middlewares =========================//
//Custom Logger
app.use(logger);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//json responses
app.use(express.json());

//handle urlencoded data (form data)
app.use(express.urlencoded({ extended: false }));

////============================ static files =========================//
//serve static files
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/", root);
app.use("/employees", employees);

app.all("*", (_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
