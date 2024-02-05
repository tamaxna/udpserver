const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
  console.log(`Received UDP message: ${message} from ${remote.address}:${remote.port}`);

  // Your logic to handle the received message

  // Example: Echo the message back to the client
  server.send(message, remote.port, remote.address, (err) => {
    if (err) {
      console.error(`Error sending UDP response: ${err}`);
    } else {
      console.log(`Sent UDP response: ${message} to ${remote.address}:${remote.port}`);
    }
  });
});

// Adjust the port and address as needed
server.bind(12345, '0.0.0.0');  // '0.0.0.0' means the server will accept messages on any available network interface

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('Shutting down UDP server...');
  server.close(() => {
    console.log('UDP server closed.');
    process.exit();
  });
});
