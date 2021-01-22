const express = require('express');
const cors = require('cors');
const app = express();
const { authRouter} = require('./APIs/auth'); 
const { APIs } = require('./APIs');
const middlewares = require('./middlewares/middleware');

app.use(cors());

app.use('/', authRouter);
app.use('/', APIs);

// Handle 404 errors
app.use(middlewares.notFound);

// Handle error in any routes
app.use(middlewares.errorHandlers);

app.listen(5000, () => {
  console.log("localhost:5000");
})