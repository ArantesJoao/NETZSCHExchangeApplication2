const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

let data = "";

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  res.send(data);
});

app.post('/api/data', (req, res) => {
  data = req.body.data;
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
