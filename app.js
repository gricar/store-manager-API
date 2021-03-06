const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/products', require('./routers/productsRoute'));
app.use('/sales', require('./routers/salesRoute'));

app.use(require('./middlewares/error'));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
