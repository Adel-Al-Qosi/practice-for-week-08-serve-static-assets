const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/static')) {
    const urlArray = req.url.split('/')
    const urlFolder = urlArray[2]
    const urlFile = urlArray[3]
    const type = urlFile.slice(urlFile.indexOf('.') + 1)
    const asset = fs.readFileSync('./assets/' + urlFolder + '/' + urlFile)

    res.statusCode = 200

    if (urlFile.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css')
    } else {
      res.setHeader('Content-Type', 'image/' + type)
    }

    return res.end(asset)
  }

  // If the URL does not match the pattern, serve the main page
  const mainPage = fs.readFileSync('./index.html')

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end(mainPage)
});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
