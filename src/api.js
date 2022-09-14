const express = require('express');
const routes = require('./routes');
// ...
// iniciando projeto 2

const app = express();

app.use(express.json());

app.use('/login', routes.loginRoute);
app.use('/user', routes.userRoute);
app.use('/categories', routes.categoryRoute);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
