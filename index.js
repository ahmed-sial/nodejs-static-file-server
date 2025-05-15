import { readFile } from 'fs/promises';
import http from 'http';
import path from 'path';
const print = console.log;

const __dirname = import.meta.dirname;
const renderFile = async (res, filePath, successCode, contentType, errorCode, errorMessage) => {
  try {
    const encoding = contentType['Content-Type'].startsWith('image') ? null : 'utf-8';
    const dataFromFile = await readFile(filePath, encoding);
    res.writeHead(successCode, contentType);
    res.end(dataFromFile);
  } catch (error) {
    res.writeHead(errorCode, contentType);
    res.end(errorMessage);
    console.error('An unexpected error occured while reading file: ' + error.message);
  }

}

const server = http.createServer(async (req, res) => {
  print(req.method + ' ==> ' + req.url);
  if (req.method === 'GET') {
    if (req.url === '/') {
      return renderFile(res,
        path.join(__dirname, 'public', 'index.html'),
        200,
        { 'Content-Type': 'text/html' },
        404,
       `<h1 style="text-align: center">Sorry! The page couldn't be rendered</h1>`);
    } else if (req.url === '/styles.css') {
      return renderFile(res,
        path.join(__dirname, 'public', 'styles.css'),
        200,
        { 'Content-Type': 'text/css' },
        404,
       `<h1 style="text-align: center">Sorry! The page couldn't be rendered</h1>`);
    } else if (req.url.startsWith('/image') && req.url.endsWith('.png')) {
      return renderFile(res,
        path.join(__dirname, 'public', req.url),
        200,
        { 'Content-Type': 'image/png' },
        404,
       `<h1 style="text-align: center">Sorry! The page couldn't be rendered</h1>`);
    } else if (req.url === '/favicon.ico') {
      return renderFile(res,
        path.join(__dirname, 'public', 'favicon.ico'),
        200,
        {'Content-Type': 'image/x-icon'},
        404,
        ''
      );
    }
  }
});

const PORT = 3000;
server.listen(PORT, () => print(`Listening at PORT ${PORT}`));