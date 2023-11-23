import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  request(app).put(`/api/tickets/${id}`).send().expect(401);
});

it('returns a 404 if the provided id does not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});

it('returns a 401 if the user is not the owner', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asldkfj',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'alskdjflskjdf',
      price: 1000,
    })
    .expect(401);
});

it('returns a 400 if the ticket does not have valid title or price', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'title',
      price: 30,
      userId: '12312232',
    })
    .expect(201);
  const title = 'awesome title';
  const price = 123;
  const updatedTicket = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({})
    .expect(400);
});

it('update ticket with valid inputs', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'title',
      price: 30,
      userId: '12312232',
    })
    .expect(201);
  const title = 'awesome title';
  const price = 123;
  const updatedTicket = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title,
      price,
    });
  expect(updatedTicket.body.title).toEqual(title);
  expect(updatedTicket.body.price).toEqual(price);
});
