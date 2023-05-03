import EventEmitter from "events";
import logEvents from "./logEvents";

const myEmitter = new EventEmitter();

myEmitter.on("log", (msg) => {
  logEvents(msg);
});

myEmitter.emit("log", "Hello World");
