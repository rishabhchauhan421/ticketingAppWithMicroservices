import mongoose from 'mongoose';
import { app } from './../app';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  const mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
  console.log('Connected to Auth MongoDB');
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
