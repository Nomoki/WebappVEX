
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import postRoutes from './routes/posts.js';
import userRouter from './routes/users.js';
import posRoutes from './routes/transformModel.js';


const app = express();

app.use(compression());
app.use(express.json({ limit: '1000mb', extended: true }))
app.use(express.urlencoded({ limit: '1000mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);
app.use("/pos", posRoutes);

const CONNECTION_URL = 'mongodb+srv://Oaky:12af7ooM@vewafdb.s4toy.mongodb.net/vewafdb';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
