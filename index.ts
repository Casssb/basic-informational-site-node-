const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req: any, res: any) => {
  const file = path.join(
    __dirname,
    req.url === '/' ? './views/index.html' : `./views/${req.url}.html`
  );
  fs.readFile(file, 'utf8', (err: any, data: any) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(
          path.join(__dirname, './views/404.html'),
          'utf8',
          (err: any, data: any) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(data);
          }
        );
      }
      console.log(err);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`server activess on ${hostname} port ${port}`);
});
