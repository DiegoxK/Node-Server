import { ErrorRequestHandler } from "express";
import { logEvents } from "./logEvents";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.url}\t${err.name}:\t${err.message}`,
    "errLog.txt"
  );
  console.error(err.stack);
  res.status(500).send(err.message);
};

export default errorHandler;
