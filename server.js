const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));                   //__dirname stored path to project directory -> node-web-server

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {          //'\n' -> new line
    if (err) {
      console.log('unable to append to server.log.')
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res)=> {
  res.render('home.hbs', {
    welcomeMessage: 'Hello guest! Welcome to my first page',
    pageTitle: 'Home Page',
  });
});

app.get('/about',(req, res) => {                                  //new page (url = localhost:3000/about)
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'                      //Property: errorMessage
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000')
});                                                 //listens on local server 3000
