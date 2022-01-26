import express from 'express';
import { asyncHandler } from './helpers';

export const httpApiHandler = express.Router();

httpApiHandler.get(
  '/room/:roomID',
  asyncHandler((req, res) => {
    let roomID = req.params.roomID;

    console.log(roomID);

    res.send('');
  }),
);
