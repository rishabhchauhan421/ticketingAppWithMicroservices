import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';

let mongo: MongoMemoryServer;

declare global {
  var signin: () => string[];
}
global.signin = () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  //Create payload
  const payload = {
    email: 'abc@Abo.com',
    id: id,
  };

  //create user jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //create session
  const session = { jwt: token };

  //turn session into json
  const sessionJSON = JSON.stringify(session);

  //take sessionjson and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return string i.e. cookie with the base64 encoded data
  return [`session=${base64}`];
  // return [`express:sess=${base64}`];
};

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  const mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  console.log('Connected to Tickets MongoDB');
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  // await mongo.stop();
  await mongoose.connection.close();
});
