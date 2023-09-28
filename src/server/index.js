const express = require('express');
const cors = require('cors');

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
