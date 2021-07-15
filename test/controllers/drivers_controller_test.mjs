import assert from 'assert';
import mongoose from 'mongoose';
import app from '../../app.mjs';
import request from 'supertest';

const Driver = mongoose.model('driver');

describe('Drivers Controller', () => {
  it('post to api/drivers creates a new driver', done => {
    Driver.estimatedDocumentCount()
      .then(count => {

        request(app)
          .post('/api/drivers')
          .send({ email: 'johndoe@example.com' })
          .end(() => {

            Driver.estimatedDocumentCount()
              .then(newCount => {
                assert(count + 1 === newCount);
                done();
              });
          });

      });

  });
});