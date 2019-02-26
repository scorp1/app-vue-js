import Conn from './data/connect.js';
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');


let app = express();
Conn();
app.set('port', 3000);
app.listen(app.get('port'), () => {
    console.log(`OK Server is running localhost : ${app.get('port')}`);
});

mongoose.connect('mongodb://scorp:9058393913@cluster0-shard-00-00-gvgkp.azure.mongodb.net:27017,cluster0-shard-00-01-gvgkp.azure.mongodb.net:27017,cluster0-shard-00-02-gvgkp.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {useNewUrlParser: true})
 .then(db => console.log('OK DB is connect'))
 .catch(err => console.log('Error!'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/records', require('./routes/record'));
app.use('/', express.static(path.join(__dirname, '../dist')));