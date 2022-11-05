const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Genius Cars server running...');
});

app.listen(port);
