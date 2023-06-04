# **Node Web Server**

🚀 **Project Description**

This project is a server-side application built with Node.js. It creates an HTTP server that serves files based on the requested URL. It supports various content types such as HTML, CSS, JavaScript, JSON, images, and plain text files.

## **Features**

✅ Serve static files: The server can serve static files based on the requested URL and content type.

✅ Content type detection: The server automatically detects the content type based on the file extension.

✅ Default file handling: When the requested URL is "/", the server serves the index.html file from the views directory.

✅ 404 handling: When a requested file does not exist, the server responds with a "404 Not Found" page.

✅ Redirects: The server supports 301 redirects. For example, when the requested URL is "/old-page.html", the server redirects to "/new-page.html".

✅ Logging: The server logs each request's URL and method to a log file using the logEvents module.

## **Technologies Used**

🛠️ Node.js - JavaScript runtime environment  
🛠️ HTTP module - Built-in Node.js module for creating an HTTP server  
🛠️ fs module - Built-in Node.js module for file system operations  
🛠️ path module - Built-in Node.js module for working with file paths  
🛠️ EventEmitter - Built-in Node.js module for event-driven programming

## **Installation**

1. Clone the repository.

2. Navigate to the project directory.

3. Install the dependencies by running the following command:

```shell
npm install
```

## **Usage**

Start the server by running the following command:

```shell
npm start
```

The server will start running on the specified port (or default port 3500).

Open your web browser and visit http://localhost:\<PORT> to access the application.

## **Logs**

The server logs each request's URL and method to a log file located in the _logs_ directory. The log file is named based on the type of log (e.g., "reqLog.txt" for request logs and "errLog.txt" for error logs). The logs include a timestamp, a unique identifier, the current date, and the log message.
