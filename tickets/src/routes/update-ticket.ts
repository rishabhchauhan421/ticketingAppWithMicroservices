import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import {
  BadRequestError,
  DatabaseConnectionError,
  NotAuthorisedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@rishabhtickets/common';

const route = express.Router();

route.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Invalid title'),
    body('price').isFloat({ gt: 0 }).withMessage('Invalid price'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser.id) {
      throw new NotAuthorisedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    res.send(ticket);
  }
);

export { route as UpdateTicketRouter };
