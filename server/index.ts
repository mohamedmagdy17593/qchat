require('dotenv').config();

import express, { NextFunction, Request, Response } from 'express';
import next from 'next';
import cors from 'cors';
import morgan from 'morgan';
// import * as admin from 'firebase-admin';
// import serviceAccount from '../config/firebase-admin-service-account.json';

// routes import
// import authRouter from './routes/auth';
// import sitesRouter from './routes/sites';

/**
 * Initialize firebase admin
 */
// admin.initializeApp({
//   // @ts-ignore
//   credential: admin.credential.cert(serviceAccount),
// });

// const api = process.env.API_URL;

const dev = process.env.NODE_ENV !== 'production';
const appUi = next({ dev });
const handle = appUi.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await appUi.prepare();

    const app = express();

    /**
     * Middleware
     */
    app.use(express.json());
    app.use(cors());
    app.use(morgan('tiny'));

    /**
     * Routes
     */
    // app.use(`/api`, authRouter);
    // app.use(`/api/sites`, sitesRouter);

    app.get('/hola', (req, res) => {
      res.send(`Hello`);
    });

    /**
     * Handle Nextjs Requests
     */
    app.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    /**
     * Errors
     */
    // error handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status ?? 500).json({ message: err.message });
    });

    /**
     * Start Server
     */
    app.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
