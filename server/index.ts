require('dotenv').config();

import express, { NextFunction, Request, Response } from 'express';
import next from 'next';
import cors from 'cors';
import morgan from 'morgan';
import { Server, Socket } from 'socket.io';
import http from 'http';

import { apiSocketHandler } from './apihandler';

const dev = process.env.NODE_ENV !== 'production';
const appUi = next({ dev });
const handle = appUi.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await appUi.prepare();

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: { origin: '*' },
    });

    /**
     * Middleware
     */
    app.use(express.json());
    app.use(cors());
    app.use(morgan('tiny'));

    io.on('connection', (socket: Socket) => {
      console.log('-- socket connection id #', socket.id);
      apiSocketHandler(io, socket);
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
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
