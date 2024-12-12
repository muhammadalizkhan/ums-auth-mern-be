const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();  // Make sure .env is loaded
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(express.json());
app.use(cors(corsOptions));

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

connectDB();

app.get('/', (req, res) => {
  res.send('Hello from the MERN backend!');
});
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong!' });
});
