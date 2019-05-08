const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const port = 3000;
const Checkout = require('./database/index.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './client/dist')));

app.listen(port, () => `Listening on port: ${port}`);

app.get('/api', (req, res) => {
  let { email } = req.params;
  Checkout.find({ email})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(200).send('Failed to retrieve', err));
});

app.post('/api/info', (req, res) => {
  let {
    name,
    email,
    password,
    address,
    city,
    state,
    zipcode,
    phone,
    cc,
    exp,
    cvv,
    billingZipCode
  } = req.body;
  Checkout.create({
    name,
    email,
    password,
    address,
    city,
    state,
    zipcode,
    phone,
    cc,
    exp,
    cvv,
    billingZipCode
  })
    .then(() => res.status(200).send('Successfully Created'))
    .catch(err => res.status(404).send('Failed to post', err));
});

app.delete('/api', (req, res) => {
  Checkout.deleteMany({})
    .then(() => res.status(200).send('Successfully Deleted'))
    .catch(err => res.status(404).send('Failed to Delete'));
});


app.put('/api/info/:email', (req,res) => {
  let { email } = req.params
  let { name, password, address, city, state, zipcode, phone, cc, exp, cvv, billingZipCode} = req.body
  console.log(req.body)
  console.log(req.params)
  Checkout.findOneAndUpdate({email},req.body)
  .then(() => res.status(200).send('Successful'))
  .catch(err => res.status(404).send('Failed'))
}) 