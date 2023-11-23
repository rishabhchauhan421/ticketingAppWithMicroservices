import { requireAuth, validateRequest } from '@rishabhtickets/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Invalid title'),
    body('price').isFloat({ gt: 10 }).withMessage('Invalid price'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser.id,
    });
    ticket.save();
    return res.status(201).send(ticket);
  }
);

export { router as CreateTicketRouter };
