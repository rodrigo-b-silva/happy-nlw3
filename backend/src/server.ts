import express  from 'express';

import './database/connection';

const app = express();

app.use(express.json());

app.post('/teste', (req, res) => {
  console.log(req.body)
})

app.listen(3333);