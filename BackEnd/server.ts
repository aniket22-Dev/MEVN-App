const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./databaseConfig/database.config.ts');
const mongoose = require('mongoose');
const cors = require('cors');
const ProductRoute = require('./Routes/routes');
const port = 3000

const app = express().use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/v2',ProductRoute)

app.listen(3000, () => {
    console.log(`server is working fine on http://localhost:${port}`);
});

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch((err: any) => {
    console.log('Could not connect to the database', err);
    process.exit();
});