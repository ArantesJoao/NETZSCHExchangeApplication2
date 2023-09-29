const cors = require('cors');
const WebSocket = require('ws');
const express = require('express');


const app = express();
const PORT = 3001;

let dataStore = {
  react: "",
  net: ""
};

app.use(cors());
app.use(express.json());

app.get('/api/data/:source', (req, res) => {
  const source = req.params.source;
  res.send(dataStore[source] || "");
});

app.post('/api/data/:source', (req, res) => {
  const source = req.params.source;
  dataStore[source] = req.body.data;
  res.send('OK');
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.source && parsedMessage.data) {
      dataStore[parsedMessage.source] = parsedMessage.data;
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            source: parsedMessage.source,
            data: parsedMessage.data
          }));
        }
      });
    }
  });
});
