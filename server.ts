import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './src/routes';
import cors from 'cors';

import './src/database';

const app = express();

app.use(express.json());

app.use(cors());
app.use(routes);

app.get('/test', (req, res) => res.json({ message: 'foi' }));

app.listen(process.env.PORT || 3333, () => console.log('Entrou'));
