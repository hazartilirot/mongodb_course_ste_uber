import express from 'express';
import routes from './routes/routes.mjs';
import mongoose from 'mongoose';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/muber', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
}

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

export default app;