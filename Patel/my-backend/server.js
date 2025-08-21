require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// ======================
// 1. Enhanced Middleware
// ======================
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// ======================
// 2. Database Connection (Fixed)
// ======================
const connectWithRetry = async () => {
  try {
    // Use environment variable or fallback to local MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    console.log('✅ MongoDB Connected Successfully!');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('Common solutions:');
    console.log('1. Check your IP is whitelisted in MongoDB Atlas');
    console.log('2. Verify your connection string in .env file');
    console.log('3. Ensure your cluster is not paused');
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// ======================
// 3. Routes
// ======================
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to our backend!',
    status: 'operational',
    timestamp: new Date()
  });
});

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(dbStatus === 'connected' ? 200 : 503).json({
    status: dbStatus,
    database: dbStatus,
    timestamp: new Date(),
    uptime: process.uptime(),
    mongoConnectionState: mongoose.connection.readyState
  });
});

// ======================
// 4. Error Handling
// ======================
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    availableEndpoints: ['/', '/health']
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message || 'Unknown error occurred'
  });
});

// ======================
// 5. Server Startup
// ======================
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`Health check: http://localhost:${PORT}/health\n`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('\nShutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server closed');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);