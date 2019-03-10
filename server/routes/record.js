const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Record = require('../models/Record');
const Connect = require('../connect.js');

router.get('/', async (req, res) => {
    res.json(await Record.find());
});

router.get('/:id', async (req, res) => {
    res.json(await Record.findById(req.params.id));
});
router.post('/', async (req, res) => {
    const record = new Record(req.body);
    await record.save();
    const output = ` 
    <p> You have a new message from nice-app:</p>
    <p>Entered new user to databases.</p>
    <ul>
        <li>name: ${req.body.name}</li>
        <li>email: ${req.body.email}</li>
        <li>address: ${req.body.address}</li>
        <li>gender: ${req.body.gender}</li>
    </ul>
    `;
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: false,
        auth: {
            user: Connect.getLogin(),
            pass: Connect.getPass()
        }
    });

    let mailOptions = {
        from: 'vuejs-vladimir@yandex.ru',
        to: 'cgartscorp@gmail.com',
        subject: `nice-course | New message`,
        text: req.body.name,
        html: output
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    res.json({state: 'success'});
});

router.put('/:id', async (req, res) => {
    await Record.findByIdAndUpdate(req.params.id, req.body);
    res.json({state: 'updated'})
});
router.delete('/:id', async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.json({state: 'deleted'})
});

module.exports = router;