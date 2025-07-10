const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

const hostname = "localhost";
const port = 8080;

const server = http.createServer((req, res) => {
  let fileName = "";

  switch (req.url) {
    case "/":
      fileName = "index.html";
      break;
    case "/about":
      fileName = "about.html";
      break;
    case "/contact-me":
      fileName = "contact-me.html";
      break;
    default:
      fileName = "404.html";
      res.statusCode = 404;
      break;
  }

  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    } else {
      res.writeHead(res.statusCode || 200, { "Content-Type": "text/html" });
      console.log(res.statusCode);
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
