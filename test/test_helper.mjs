import mongoose from 'mongoose';

before(done => {
  
  mongoose.connect('mongodb://localhost:27017/muber_test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  
  const db = mongoose.connection;
  
  db.on('error', error => console.warn('warning', error));
  db.once('open', () => done());
});

beforeEach(done => {
  
  const { drivers } = mongoose.connection.collections;
  
  drivers.drop()
    .then(() => drivers.createIndex({'geometry': '2dsphere'}))
    .then(() => done())
    .catch(() => done())
});
