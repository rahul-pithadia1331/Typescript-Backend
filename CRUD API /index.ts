import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router/router'

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_URL as string);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    console.log('Connected successfully');
});


app.use(bodyParser.urlencoded({ extended: false as boolean }));
app.use(bodyParser.json());

app.use("/api/v1", router)

app.listen(process.env.PORT as number | string, function () {
    console.log(`listening on port ${process.env.PORT}`);
});
