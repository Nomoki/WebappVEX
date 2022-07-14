
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import posRoutes from './routes/transformModel.js';
import posproductRoutes from './routes/productModel.js';



const app = express();
dotenv.config();

app.use(compression());
app.use(express.json({ limit: '1000mb', extended: true }))
app.use(express.urlencoded({ limit: '1000mb', extended: true }))
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/pos", posRoutes);
app.use("/posprod", posproductRoutes);

app.get("/", (req, res) => {
  res.send("WebappVEX_API")
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
