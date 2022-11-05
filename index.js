const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.4w0vbzl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  const services = client.db('genius-cars').collection('services');

  try {
    app.get('/services', async (req, res) => {
      const query = {};
      const cursor = services.find(query);
      const data = await cursor.toArray();
      res.json(data);
    });

    app.get('/services/:serviceId', async (req, res) => {
      const id = req.params.serviceId;

      const query = { _id: ObjectId(id) };
      const service = await services.findOne(query);
      res.json(service);
    });
  } finally {
  }
};

run().catch(error => console.error(error));

app.get('/', (req, res) => {
  res.send('Genius Cars server running...');
});

app.listen(port);
