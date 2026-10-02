import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll, afterEach } from 'vitest';
import { apiLimiter, authLimiter, analyzeLimiter } from '../src/middlewares/rateLimiter.js';
import app from '../src/app.js';

let mongoServer;

beforeAll(async () => {
  // Trust proxy for rate limit spoofing in tests
  app.set('trust proxy', 1);

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clear Database
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
  
  // Clear Rate Limiters for the default supertest IP
  apiLimiter.resetKey("::ffff:127.0.0.1");
  authLimiter.resetKey("::ffff:127.0.0.1");
  analyzeLimiter.resetKey("::ffff:127.0.0.1");
});
