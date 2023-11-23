import { Ticket } from '../../models/ticket';
import { app } from './../../app';
import request from 'supertest';

it('return 401 if not authorised', async () => {
  await request(app)
    .post('/api/tickets')
    .send({
      title: 'awesome title',
      price: 30,
      userId: '12312232',
    })
    .expect(401);

  await request(app)
    .post('/api/tickets')
    .send({
      title: '',
      price: 30,
      userId: '12312232',
    })
    .expect(401);
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it('return 400 if title is invalid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 30,
      userId: '12312232',
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 30,
      userId: '12312232',
    })
    .expect(400);
});

it('return 400 if price is invalid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      price: -10,
      userId: '12312232',
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'title',
      price: 0,
      userId: '12312232',
    })
    .expect(400);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      userId: '12312232',
    })
    .expect(400);
});

it('return 201 if ticket is created', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const title = 'awesome title';

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 30,
      userId: '12312232',
    })
    .expect(201);

  //checking if count has changed
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(response.body['title']).toEqual(title);
});
