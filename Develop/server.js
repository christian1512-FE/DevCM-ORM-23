const express = require('express');
const routes = require('./routes');
// import sequelize connection
// ADDED LINE 5
const sequelize = require('./config/connection');

// iMPORT MODEL TO SYNC TABLE WITH DATABASE

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

// sequelize.sync().then(() => { 
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
