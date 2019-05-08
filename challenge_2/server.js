const express = require('express');
const morgan = require('morgan');
const path = require('path');

const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded());

app.get('/api', (req, res) => {
  res.status(200).send(csv);
});

app.post('/', (req, res) => {
  let data = [];
  data.push(JSON.parse(req.body.JSON));
  let header = Object.keys(data[0]);
  var replacer = function(key, value) {
    return value === null ? '' : value;
  };
  let csv = data.map(row => {
    return header
      .map(columnName => {
        return JSON.stringify(row[columnName], replacer);
      })
      .join(',');
  });
  csv.unshift(header.join(','));
  console.log(csv);
  res.status(200).send(csv);
});

app.use(express.static('client'));

app.listen(port, () => console.log(`Listening on port ${port}`));
