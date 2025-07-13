import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const app = express();
const PORT = process.env.PORT || 3000;

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    mongoURL: process.env.DATABASE_URI || '',
    express: app,
    local: false, // Required for a server setup
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.listen(PORT, () => {
    payload.logger.info(`Payload is listening on port ${PORT}`);
  });
};

start();