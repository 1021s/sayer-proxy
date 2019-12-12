const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/../public/dist`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// docker run -d -p 3003:3003 -- sayer
// docker run -d -p 3005:3005 -- inna
// docker run -d -p 3001:3001 -- kyle
// docker run -d -p 3002:3002 -- patrick
app.get('/sayer-service/bundle.js', (req, res) => {
  request('http://localhost:3003/bundle.js', (err, response) => {
    if (err) {
      console.log(err);
    }
    res.send(response.body);
  });
});

app.get('/api/listing/:Listing_id/', (req, res) => {
  request('http://localhost:3003/api/listing/' + req.params.Listing_id, (err, response) => {
    if (err) {
      console.log(err);
    }
    res.send(response.body);
  });
});

app.get('/inna-service/bundle.js', (req, res) => {
  request('http://localhost:3005/dist/bundle.js', (err, response) => {
    // console.log('response ', response.body);
    if (err) {
      console.log(err);
    }
    res.send(response.body);
  });
});

app.get('/api/photos/:id/', (req, res) => {
  request('http://localhost:3005/api/photos/' + req.params.id, (err, response) => {
    if (err) {
      console.log(err);
    }
    res.send(response.body);
  });
});

app.get('/patrick-service/bundle.js', (req, res) => {
  request('http://localhost:3002/bundle.js', (err, response) => {
    if (err) {
      console.log(err);
    }
    res.send(response.body);
  });
});

app.get('/listings/:id', (req, res) => {
  request('http://localhost:3002/listings/' + req.params.id, (err, response) => {
    if (err) {
      console.log(err);
    }
    res.send(response.body);
  });
});

app.get('/kyle-service/bundle.js', (req, res) => {
  request('http://localhost:3001/bundle.js', (err, response) => {
    if (err) console.error(err);
    res.send(response.body);
  });
});

app.get('/api/listings/:Listing_id', (req, res) => {
  request('http://localhost:3001/api/listings/' + req.params.Listing_id, (err, response) => {
    if (err) console.error(err);
    res.send(response.body);
  });
});