const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
      },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

/**
 * Function to hash a password that only encrypted passwords are stored in the database
 * @param {string} password
 */

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
  });

  userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };

  /**
 * Function to compare the hashed password in the database with the password that users enter
 * this is an instant method that does not take an arrow function
 * @param {string} password
 */
  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
  };

  let Movie = mongoose.model('Movie', movieSchema);
  let User = mongoose.model('User', userSchema);

  module.exports.Movie = Movie;
  module.exports.User = User;
