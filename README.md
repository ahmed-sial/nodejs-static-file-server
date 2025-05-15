# Node.js Static File Server

A lightweight static file server built with vanilla Node.js (no Express or other frameworks) that demonstrates how to serve HTML, CSS, images and favicons using only Node's built-in modules.

## Features

- Pure Node.js implementation using only built-in modules (`http`, `fs/promises`, `path`)
- Serves HTML, CSS, images and favicon files
- Proper content-type handling for different file types
- Binary file handling for images and favicons
- Simple and easy-to-understand error handling
- Clean code structure for educational purposes

## Live Demo

The project displays a gallery of images related to "Shikwa" (a famous poem by Dr. Muhammad Allama Iqbal).

## Project Structure

```
nodejs-static-file-server/
├── index.js              # Main server code
├── public/               # Static files directory
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styling
│   ├── favicon.ico       # Website favicon
│   └── images/           # Images directory
│       ├── shikwa_1.png
│       ├── shikwa_2.png
│       ├── shikwa_3.png
│       └── shikwa_4.png
└── README.md             # This file
```

## Installation & Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nodejs-static-file-server.git
   cd nodejs-static-file-server
   ```

2. Make sure you have Node.js installed (version 14.0.0 or higher recommended)

3. Start the server:

   ```bash
   node server.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How It Works

This server demonstrates several key concepts:

1. **File Serving Logic**: Uses `fs/promises` to read files asynchronously from the file system
2. **Content-Type Handling**: Sets appropriate MIME types for different file formats
3. **Binary Data Handling**: Properly handles binary data for images and favicons
4. **Error Handling**: Gracefully handles file not found and other errors
5. **Dynamic Route Handling**: Efficiently routes requests to appropriate files

## Key Code Sections

### File Reading Function

```javascript
const renderFile = async (res, filePath, successCode, contentType, errorCode, errorMessage) => {
  try {
    // For images, use binary data instead of utf-8
    const encoding = contentType['Content-Type'].startsWith('image/') ? null : 'utf-8';
    const dataFromFile = await readFile(filePath, encoding);
    res.writeHead(successCode, contentType);
    res.end(dataFromFile);
  } catch (error) {
    res.writeHead(errorCode, { 'Content-Type': 'text/html' });
    res.end(errorMessage);
    console.error('An unexpected error occurred while reading file: ' + error.message);
  }
}
```

## Learning Outcomes

This project demonstrates:

- How to serve static files with Node.js without frameworks
- Handling different content types appropriately
- Working with binary files vs text files
- Basic routing in a Node.js HTTP server
- Error handling patterns for file serving

---

Feel free to star this repository if you find it useful, and contributions are always welcome!
