var http = require('http');

// Create a server object:
http.createServer(function (req, res) {
  res.write('Hello from Node.js inside a Docker container! 🚀');  // write a response to the client
  res.end(); // end the response
}).listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
