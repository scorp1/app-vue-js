const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const connect = require('./connect.js');

let app = express();
app.set('port', 3000);
app.listen(app.get('port'), () => {
    console.log(`OK Server is running localhost : ${app.get('port')}`);
});

mongoose.connect(connect.getConnect(), {useNewUrlParser: true})
 .then(db => console.log('OK DB is connect'))
 .catch(err => console.log('Error!'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/api/records', require('./routes/record'));
app.use('/', express.static(path.join(__dirname, '../dist')));