import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true })); //Setting size limits
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); //Setting size limits
app.use(cors());

app.use('/posts', postRoutes); 
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Recipes API'); 
})

const PORT = process.env.PORT || 5000; //Saying what port we are testing on

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))) //Listening and returning what port we are running on
    .catch((error) => console.log(error.message)); //Return error if it doesn't work
