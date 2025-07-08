import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { WsException } from '@nestjs/websockets';

describe('WebSocket Chat', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await Test.createNestApplication(Test.createTestingModule({
      imports: [AppModule],
    }).compile());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('должен подписать клиента на чат', (done) => {
    const client = require('socket.io-client');

    const socket = client('http://localhost:3001');

    socket.on('connect', () => {
      socket.emit('subscribeToChat', 'chat123');
    });

    socket.on('chatMessage', (request, message) => {
      expect(request.id).toBe('chat123');
      done();
    });
  });

  it('должен отправлять сообщение только подписчикам чата', (done) => {
    const client = require('socket.io-client');

    const socket1 = client('http://localhost:3001');
    const socket2 = client('http://localhost:3001');

    socket1.on('connect', () => {
      socket1.emit('subscribeToChat', 'chat123');
    });

    socket2.on('connect', () => {
      socket2.emit('subscribeToChat', 'chat456');
    });

    socket2.on('chatMessage', (request, message) => {
      if (request.id === 'chat123') {
        done.fail('Сообщение получено не тем клиентом');
      }
    });

    socket1.emit('sendMessage', {
      supportRequest: 'chat123',
      text: 'Привет из чата',
    });

    socket1.on('chatMessage', (request, message) => {
      expect(message.text).toBe('Привет из чата');
      done();
    });
  });
});