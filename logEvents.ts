import { v4 as uuid } from "uuid";
import fs, { promises as fsPromises } from "fs";
import path from "path";

const logEvents = async (message: string) => {
  const date = new Date();

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const timeString = timeFormatter.format(date);
  const dateString = dateFormatter.format(date);

  const logItem: string = `${timeString} - ${uuid()} - ${dateString} - ${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    //appends content to a file, creates a file if it doesn't exist
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

export default logEvents;
