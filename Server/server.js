const http = require('http');
const app = require('./app');






const server =http.createServer(app);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error("❌ Server error:", err.message);
});