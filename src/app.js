const express = require('express');
const { LoginRouter } = require('./router/index');
const { UserRouter } = require('./router/index');
const { CategoryRouter } = require('./router/index');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/categories', CategoryRouter);
app.use('/login', LoginRouter);
app.use('/user', UserRouter);
app.use('/:id', UserRouter);
// ...
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
