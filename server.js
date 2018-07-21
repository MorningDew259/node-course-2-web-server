const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;      // "|| => or"
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {                           //express middleware (a-synchronus)
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;         // now: time; method: f.e. get; URL: f.e. /about

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {          //creates log file what is opened; '\n' -> new line
    if (err) {
      console.log('unable to append to server.log.')
    }
  });
  next();                                             //doesn't move on only wenn "next" is called
});

// app.use((req, res, next) => {           //middleware: doesn't call next -> doesn't continue with everything underneath
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));                   //__dirname stored path to project directory -> node-web-server


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

app.get('/projects',(req, res) => {                                  //new page (url = localhost:3000/about)
  res.render('projects.hbs', {
    pageTitle: 'Projects',
  });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'                      //Property: errorMessage
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});                                                 //listens on local server 3000
