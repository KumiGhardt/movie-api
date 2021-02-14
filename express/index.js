const express = require("express");
const morgan = require('morgan');

const app = express();

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
        bio: ['Born: August 25, 1972 in London, England, UK'],
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

app.use(morgan('common'));

app.use('/documentation', express.static('public'));

//get request
app.get('/', (req, res) => {
    res.send('Welcome to my movie index');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.get('/users', (req, res) => {
    res.json(users)
});

//
// Gets the list of data about ALL movies
app.get('/movies/all', (req, res) => {
    res.json(topMovies);
});

// Gets the data about a single movie, by name -- does not show name of movie in the preview so does not work
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((title) => {
        return topMovies.title === req.params.title
    }));
});

//Gets the data about a genre
app.get('/movies/:title/:genre', (req, res) => {
    res.send('Successful GET request returning data on the details on one genre');
});

//gets data about director - SEEMINGLY THIS ISNT WORKING
app.get('/movies/:director', (req, res) => {
    res.send('Successful GET request returning data on the details on one director and his titles');
});

//allows new users to register - - SEEMINGLY THIS ISNT WORKING
app.post('/users/:registration', (req, res) => {
    res.send('Successful POST request updating user details');
});

//allows users to update info: username - - SEEMINGLY THIS ISNT WORKING
app.put('/users/', (req, res) => {
    res.send('Successful PUT request updating user details');
});

//adds data to users favourite movies - - SEEMINGLY THIS ISNT WORKING

app.put('/users/:movies', (req, res) => {
    res.send('Successful PUT request updating user details');
});

//removes data from users favourite movies by title - SEEMINGLY THIS ISNT WORKING
app.delete('/user/:title', (req, res) => {
    res.send('Successful DELETE request deleting movie data from users favourites');
});


//delete user - SEEMINGLY THIS ISNT WORKING
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