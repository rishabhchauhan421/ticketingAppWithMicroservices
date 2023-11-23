import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@rishabhtickets/common';

const route = express.Router();

route.get('/api/tickets/:id', async (req: Request, res: Response) => {
  // console.log('inside route');
  // console.log(req.params.id);
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }
  return res.send(ticket);
});

export { route as ShowTicketRouter };
