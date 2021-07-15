import express from 'express';
import routes from './routes/routes.mjs';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost:27017/muber', { 
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

export default app;