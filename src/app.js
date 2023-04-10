const express = require('express');
const { LoginRouter } = require('./router/index');
const { UserRouter } = require('./router/index');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', LoginRouter);
app.use('/user', UserRouter);
app.get('/:id', UserRouter);
// ...
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
