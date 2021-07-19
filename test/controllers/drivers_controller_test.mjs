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
  it('edits an existing driver by id - PUT /api/drivers/:id', done => {
    const driver = new Driver({ email: 'johndoe@uber.com' });

    driver.save()
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ driving: true })
          .end(() => {
            Driver.findOne({ email: 'johndoe@uber.com' })
              .then(foundDriver => {
                assert(foundDriver.driving === true);
                done();
              });
          });
      });
  });
  it('deletes an existing driver by id - REMOVE /api/drivers/:id', done => {
    const driver = new Driver({ email: 'johndoe@uber.com' });

    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
            Driver.findOne({ email: 'johndoe@uber.com' })
              .then(foundDriver => {
                assert(foundDriver === null);
                done();
              });
          });
      });
  });

  it('finds drivers in a location GET /api/drivers', done => {
    const seattleDriver = new Driver({
      email: 'johndoe@seattle.uber.com',
      geometry: { type: 'Point', coordinates: [-122.342295, 47.627442] },
    });
    
    const miamiDriver = new Driver({
      email: 'johndoe@miami.uber.com',
      geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] },
    });
    
    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, res) => {
            assert(res.body.length === 1);
            assert(res.body[0].email === 'johndoe@miami.uber.com');
            done();
          })
      })
  });
});