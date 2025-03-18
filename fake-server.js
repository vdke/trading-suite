const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Real-time data server is running');
});

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  // Simulate price updates every 3 seconds
  setInterval(() => {
    const newPrice = {
      date: new Date().toISOString().split("T")[0],
      open: 4200,
      high: 4250,
      low: 4150,
      close: 4230,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    };
    socket.emit('priceUpdate', newPrice);
  }, 3000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(\`Server running on http://localhost:\${port}\`);
});
