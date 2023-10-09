const express = require('express');
require('dotenv').config();
const firebase=require('./config')
const passRoutes = require('./routes/apple-pass');



const app = express();
app.use(express.json());
app.use(passRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
