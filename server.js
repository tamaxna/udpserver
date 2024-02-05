const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
  console.log(`Received UDP message: ${message} from ${remote.address}:${remote.port}`);

  // Echo the message back to the client
  server.send("Hello, UDP Server", remote.port, remote.address, (err) => {
    if (err) {
      console.error(`Error sending UDP response: ${err}`);
    } else {
      console.log(`Sent UDP response: Hello, UDP Server to ${remote.address}:${remote.port}`);
    }
  });
});

server.bind(12345, '127.0.0.1');
