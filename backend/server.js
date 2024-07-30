const express = require('express');
require('dotenv').config();
require('colors');

const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'success',
  //   message: `can not find ${req.originalUrl} on this server`,
  // });
  res.status(404);
  throw new Error(`can not find ${req.originalUrl} on this server`);
});
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
