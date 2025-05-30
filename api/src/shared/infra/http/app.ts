import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v1Router } from './api/v1';
import { isProduction } from '../../../config';
import swaggerDocs from '../swagger/swagger.config';
import { initializeFirebase } from '../database/firebase/config/config';

const origin = {
  origin: isProduction ? 'https://softgames.com' : '*'
};
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));
initializeFirebase();
app.use('/api/v1', v1Router);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  swaggerDocs(app, Number(port));
  console.log(`[App]: Listening on port ${port}`);
});
