import http from "http";
import path from "path";
import EventEmitter from "events";
import logEvents from "./logEvents";
import fs, { promises as fsPromises } from "fs";

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  const url = req.url || "/";

  const extension: string = path.extname(url);

  let contentType: string;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".ico":
      contentType = "image/x-icon";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case "txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && url.slice(-1) === "/"
      ? path.join(__dirname, "views", url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", url)
      : path.join(__dirname, url);

  if (!extension && url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //serve file
  } else {
    console.log(path.parse(filePath));
    //404
    //301 redirect
  }

  // if (req.url === "/" || req.url === "index.html") {
  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   filePath = path.join(__dirname, "views", "index.html");
  //   fs.readFile(filePath, "utf-8", (_error, data) => {
  //     res.end(data);
  //   });
  // }
});

server.listen(PORT, () => {
  console.log(`Server Runnning on ${PORT}`);
});

// const myEmitter = new EventEmitter();

// myEmitter.on("log", (msg) => {
//   logEvents(msg);
// });

// myEmitter.emit("log", "Hello World");