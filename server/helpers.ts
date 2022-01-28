import { NextFunction, Request, RequestHandler, Response } from 'express';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  countries,
  names,
  starWars,
} from 'unique-names-generator';

export function asyncHandler(fn: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}

export const errors = {
  unAuth() {
    return {
      status: 401,
      message: `Invalid user token!`,
    };
  },
};

export function getRoomID() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals, countries, names, starWars],
    separator: '-',
    length: 3,
  });
}
