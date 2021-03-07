const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');

const app = express();
app.use(bodyParser.json());
let auth = require('./auth')(app);
const Movies = Models.Movie;
const Users = Models.User;

//require the Passport module and import the “passport.js” file.
const passport = require('passport');
require('./passport');
//his allows Mongoose to connect to that database so it can perform CRUD operations
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(morgan('common'));

app.use('/documentation', express.static('public'));

//get request
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to my movie index');
});

// Gets the list of data about ALL movies
app.use(bodyParser.json());
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//get a list of all users
app.use(bodyParser.json());
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Gets the data about a single movie, by name 
app.use(bodyParser.json());
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((Title) => {
        res.json(Title);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


//Gets the data about a genre 
app.use(bodyParser.json());
app.get('/movies/:Genre', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({ Genre: req.params.Genre })
      .then((Genre) => {
        res.json(Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


//gets data about director 
app.use(bodyParser.json());
app.get('/movies/:director', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find({ Director: req.params.Director })
      .then((director) => {
        res.json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });




//add new users
app.use(bodyParser.json());
app.post('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({
            Username: req.body.Username
        })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => {
                        res.status(201).json(user)
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});


//get a user by username
app.use(bodyParser.json());
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({
            Username: req.params.Username
        })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});



//allows users to update info: username 
app.use(bodyParser.json());
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
        {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        }
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if(err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      });
    });



//adds data to users favourite movies 
app.use(bodyParser.json());
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });

//removes data from users favourite movies by title 
app.use(bodyParser.json());
app.delete('/users/:Username/Movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
        $pull: { FavoriteMovies: req.params.MovieID }
      },
      { new: true }, // This line makes sure that the updated document is returned
     (err, updatedUser) => {
       if (err) {
         console.error(err);
         res.status(500).send('Error: ' + err);
       } else {
         res.json(updatedUser);
       }
     });
   });
    


//delete user by username
app.use(bodyParser.json());
app.delete('/user/:Email', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Email: req.params.Email })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Email + ' was not found');
      } else {
        res.status(200).send(req.params.Email + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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