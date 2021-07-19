import assert from 'assert';
import request from 'supertest';
import app from '../app.mjs';

describe('The express app', () => {
  it('handles a GET request to api/', done => {
    request(app)
      .get('/api')
      .end((err, res) => {
        assert(res.body.hi === 'there');
        done();
      });
  });
});