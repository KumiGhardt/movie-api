const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');

const app = express();
app.use(bodyParser.json());
const Movies = Models.Movie;
const Users = Models.User;

//his allows Mongoose to connect to that database so it can perform CRUD operations
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/*
//library
let topMovies = [{
        title: 'Gone with the Wind',
        stars: ['Clark Gable', 'Vivien Leigh'],
        director: 'Victor Fleming',
        bio: ['Born: February 23, 1889 in La Cañada, California, USA', 'Died: January 6, 1949 (age 59) in Cottonwood, Arizona, USA'],
        year: 1939,
        rating: 8.1,
        genre: ['Drama', 'History', 'Romance', 'War'],
        synopsis: 'A manipulative woman and a roguish man conduct a turbulent romance during the American Civil War and Reconstruction periods.'
    },
    {
        title: 'The Sound of Music',
        stars: ['Julie Andrews', 'Christopher Plummer'],
        director: 'Robert Wise',
        bio: ['Born: September 10, 1914 in Winchester, Indiana, USA', 'Died: September 14, 2005 (age 91) in Los Angeles, California, USA'],
        year: 1965,
        rating: 8.0,
        genre: ['Romance', 'Musical', 'Family', 'Drama', 'Biography'],
        synopsis: 'A woman leaves an Austrian convent to become a governess to the children of a Naval officer widower.'
    },
    {
        title: 'Black Panther',
        stars: ['Chadwick Boseman', 'Michael B. Jordan'],
        director: 'Ryan Coogler',
        bio: ['Born: May 23, 1986 in Oakland, California, USA'],
        year: 2018,
        rating: 7.3,
        genre: ['Action', 'Adventure', 'SciFi'],
        synopsis: 'Prince T\'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country\'s new king. However, T\'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war. '
    },
    {
        title: 'Pride & Prejudice',
        stars: ['Keira Knightley', 'Matthew Macfadyen'],
        director: 'Joe Wright',
        bio: ['August 25, 1972 in London, England, UK'],
        year: 2005,
        rating: 7.8,
        genre: ['Drama', 'Romance'],
        synopsis: 'Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class. Can each overcome their own pride and prejudice?'
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        stars: ['Elijah Wood', 'Ian McKellen'],
        director: 'Peter Jackson',
        bio: ['Born: October 31, 1961 in Pukerua Bay, North Island, New Zealand'],
        year: 2001,
        rating: 8.8,
        genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
        synopsis: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.'
    },

    {
        title: 'Breakfast at Tiffany\'s',
        stars: ['Audrey Hepburn'],
        director: 'Blake Edwards',
        bio: ['Born: July 26, 1922 in Tulsa, Oklahoma, USA', 'Died: December 15, 2010 (age 88) in Santa Monica, California, USA'],
        year: 1961,
        rating: 7.6,
        genre: ['Comedy', 'Drama', 'Romance'],
        synopsis: 'A young New York socialite becomes interested in a young man who has moved into her apartment building, but her past threatens to get in the way.'
    },

    {
        title: 'The Lord of the Rings: The Two Towers',
        stars: ['Elijah Wood', 'Ian McKellen'],
        director: 'Peter Jackson',
        bio: ['Born: October 31, 1961 in Pukerua Bay, North Island, New Zealand'],
        year: 2002,
        rating: 8.7,
        genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
        synopsis: 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard.'
    },

    {
        title: 'The Lord of the Rings: The Return of the King',
        stars: ['Elijah Wood', 'Ian McKellen'],
        director: 'Peter Jackson',
        bio: ['Born: October 31, 1961 in Pukerua Bay, North Island, New Zealand'],
        year: 2003,
        rating: 8.9,
        genre: ['Action', 'Adventure', 'Drama', 'Fantasy'],
        synopsis: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.'
    },

    {
        title: 'Der Untergang',
        stars: ['Bruno Ganz', 'Alexandra Maria Lara', 'Ulrich Matthes'],
        director: 'Oliver Hirschbiegel',
        bio: ['Born: December 29, 1957 in Hamburg, Germany'],
        year: 2003,
        rating: 8.2,
        genre: [' Biography', 'Drama', ' History', ' War'],
        synopsis: 'In April of 1945, Germany stands at the brink of defeat with the Soviet Armies closing in from the west and south. In Berlin, capital of the Third Reich, Adolf Hitler proclaims that Germany will still achieve victory and orders his Generals and advisers to fight to the last man.'
    },

    {
        title: 'Im Keller',
        stars: ['Friz Lang', 'Manfred Ellinger', 'Alfreda Klebinger'],
        director: 'Ulrich Seidl',
        bio: ['Born: November 24, 1952 in Vienna, Austria'],
        year: 2014,
        rating: 6.7,
        genre: 'Documentary',
        synopsis: 'A documentary that reveals what its subjects do in their respective basements.'
    }

];
//users
let users = [{
    username: 'User Name',
    email: 'username@email.com'
}];
*/


app.use(morgan('common'));

app.use('/documentation', express.static('public'));

//get request
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to my movie index');
});

// Gets the list of data about ALL movies
app.use(bodyParser.json());
app.get('/movies', (req, res) => {
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
app.get('/users', (req, res) => {
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
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((Title) => {
        res.json(Title);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


//Gets the data about a genre ***NOT WORKING
app.use(bodyParser.json());
app.get('/movies/:genre.Name', (req, res) => {
    Movies.find({ "Genre.Name": req.params.genre })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


//gets data about director ***NOT WORKING
app.use(bodyParser.json());
app.get('/movies/:director.Name', (req, res) => {
    Movies.find({ "Director.Name": req.params.director })
      .then((Director) => {
        res.json(Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });




//add new users
app.use(bodyParser.json());
app.post('/users', (req, res) => {
    Users.findOne({
            Username: req.body.Username
        })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
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
app.get('/users/:Username', (req, res) => {
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
app.post('/users/:Username/Movies/:MovieID', (req, res) => {
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
    


//delete user 
app.use(bodyParser.json());
app.delete('/user/:user/:email', (req, res) => {
    res.send('Successful DELETE request deleting the users email');
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