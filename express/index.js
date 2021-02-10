const express = require("express");
const morgan = require('morgan');

const app = express();

//library
let topMovies = [{
        title: 'Gone with the Wind',
        stars: ['Clark Gable', 'Vivien Leigh'],
        director: 'Victor Fleming',
        year: 1939,
        rating: 8.1
    },
    {
        title: 'The Sound of Music',
        stars: ['Julie Andrews', 'Christopher Plummer'],
        director: 'Robert Wise',
        year: 1965,
        rating: 8.0
    },
    {
        title: 'Black Panther',
        stars: ['Chadwick Boseman', 'Michael B. Jordan'],
        director: 'Ryan Coogler',
        year: 2018,
        rating: 7.3
    },
    {
        title: 'Pride & Prejudice',
        stars: ['Keira Knightley', 'Matthew Macfadyen'],
        director: 'Joe Wright',
        year: 2005,
        rating: 7.8
    },
];

app.use(morgan('common'));

app.use('/documentation', express.static('public'));

//get request
app.get('/', (req, res) => {
    res.send('Welcome to my movie index');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use(express.static('public'));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});