const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const PORT = 3001;
const app = express();
let dataStore = { react: "", net: "" };

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/data/:source', (req, res) => {
  res.send(dataStore[req.params.source] || "");
});

app.post('/api/data/:source', (req, res) => {
  dataStore[req.params.source] = req.body.data;
  res.send('OK');
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// WebSocket setup
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const { source, data } = JSON.parse(message);
    if (source && data) {
      dataStore[source] = data;
      broadcastData(source, data, ws);
    }
  });
});

function broadcastData(source, data, sender) {
  wss.clients.forEach(client => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ source, data }));
    }
  });
}
