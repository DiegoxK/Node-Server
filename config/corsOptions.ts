import { CorsOptions } from "cors";

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

export default corsOptions;
