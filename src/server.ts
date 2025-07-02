import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const PORT = 3000;
const server = http.createServer((req, res) => {
  let filePath = '';
  let contentType = '';
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, '../src/index.html');
    contentType = 'text/html';
  } else if (req.url === '/style.css') {
    filePath = path.join(__dirname, '../src/style.css');
    contentType = 'text/css';
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
