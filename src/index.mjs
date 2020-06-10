import express from 'express';
import Router from './routes/router.mjs';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/', Router);

app.listen(port, () => {
  console.log(`💥 Server started at ${port}`)
});
