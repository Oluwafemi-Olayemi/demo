// app.js
const http = require('http'); // Import the http module
const fs = require('fs'); // Import the fs (file system) module
const path = require('path'); // Import the path module
const url = require('url'); // Import the url module

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Parse the requested URL
  const parsedUrl = url.parse(req.url);
  
  // Define the file path based on the URL
  let filePath = path.join(__dirname, 'public', parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

  // Get the file extension to determine content type
  const extname = path.extname(filePath);

  // Set default content type based on file extension
  let contentType = 'text/html';

  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    default:
      contentType = 'application/octet-stream';
  }

  // Check if the file exists, then serve it
  fs.exists(filePath, (exists) => {
    if (exists) {
      // Read and serve the file
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        }
      });
    } else {
      // Serve a 404 page if the file doesn't exist
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page Not Found');
    }
  });
});

// Define the port and hostname for the server
const PORT = 3001;
const HOSTNAME = 'localhost';

// Start the server and listen on the specified port
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
