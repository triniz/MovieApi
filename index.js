// Import modules
const express = require('express');
const morgan = require('morgan'); //For Logging
const bodyParser = require('body-parser');
const uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// Middleware
app.use(morgan('common'));
app.use(express.static('public'));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Data
let movies = [
  {
    title: 'Pontypool',
    year: '2008',
    genre: 'horror',
    length: '1h 33min',
    mpaaRating: 'Not Rated',
    director: ['Bruce McDonald'],
    writers: ['Tony Burgess'],
    starring: ['Stephen McHattie', 'Lisa Houle', 'Georgina Reilly'],
    imdbLink: 'https://www.imdb.com/title/tt1226681/',
    imdbRating: '6.6',
  },
  {
    title: 'The Shawshank Redemption',
    year: '1994',
    genre: 'Drama',
    length: '2h 22min',
    mpaaRating: 'R',
    director: ['Frank Darabont'],
    writers: ['Stephen King', 'Frank Darabont'],
    starring: ['Tim Robbins', 'Morgan Freeman'],
    imdbLink: 'https://www.imdb.com/title/tt0111161/',
    imdbRating: '9.3',
  },
  {
    title: 'Moana',
    year: '2016',
    genre: ['Animation', 'Adventure', 'Comedy'],
    length: '1h 47min',
    mpaaRating: 'pg',
    director: ['Ron Clements', 'John Musker'],
    writers: ['Jared Bush', 'Ron Clements'],
    starring: ["Auli'i Cravalho", 'Dwayne Johnson', 'Rachel House'],
    imdbLink: 'https://www.imdb.com/title/tt3521164/',
    imdbRating: '7.6',
  },
  {
    title: 'Parasite',
    year: '2019',
    genre: ['Comedy', 'Drama', 'Thriller'],
    length: '2h 22min',
    mpaaRating: 'R',
    director: 'Bong Joon Ho',
    writers: ['Bong Joon Ho'],
    starring: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Cho'],
    imdbLink: 'https://www.imdb.com/title/tt6751668/',
    imdbRating: '8.6',
  },
  {
    title: 'The Princess Bride',
    year: '1987',
    genre: ['Adventure', 'Family', 'Fantasy'],
    length: '1h 38min',
    mpaaRating: 'PG',
    director: 'Rob Reiner',
    writers: ['William Goldman'],
    starring: ['Cary Elwes', 'Mandy Patinkin', 'Robin Wright'],
    imdbLink: 'https://www.imdb.com/title/tt0093779/',
    imdbRating: '8.0',
  },
  {
    title: 'The Goonies',
    year: '1985',
    genre: ['Adventure', 'Family', 'Comedy'],
    length: '1h 54min',
    mpaaRating: 'PG',
    director: 'Richard Donner',
    writers: ['Chris Columbus', 'Steven Spielberg'],
    starring: ['Sean Astin', 'Josh Brolin', 'Jeff Cohen'],
    imdbLink: 'https://www.imdb.com/title/tt0089218/',
    imdbRating: '7.8',
  },
  {
    title: 'Jumanji: Welcome to the Jungle',
    year: '2017',
    genre: ['Adventure', 'Action', 'Comedy'],
    length: '1h 59min',
    mpaaRating: 'PG-13',
    director: 'Jake Kasden',
    writers: ['Chris Mckenna', 'Eric Sommers'],
    starring: ['Dwayne Johnson', 'Karen Gillan', 'Kevin Hart'],
    imdbLink: 'https://www.imdb.com/title/tt2283362/',
    imdbRating: '6.9',
  },
  {
    title: 'Arrival',
    year: '2016',
    genre: ['Drama', 'Sci-fi'],
    length: '1h 56min',
    mpaaRating: 'PG-13',
    director: 'Denis Villeneuve',
    writers: ['Eric Heisserer', 'Ted Chiang'],
    starring: ['Amy Adams', 'Jeremy Renner', 'Forest Whitaker'],
    imdbLink: 'https://www.imdb.com/title/tt2543164/',
    imdbRating: '7.9',
  },
  {
    title: 'Wall-E',
    year: '2008',
    genre: ['Animation', 'Adventure', 'Family'],
    length: '1h 38min',
    mpaaRating: 'G',
    director: 'Andrew Stanton',
    writers: ['Andrew Stanton', 'Pete Docter'],
    starring: ['Ben Burtt', 'Elissa Knight', 'Jeff Garlin'],
    imdbLink: 'https://www.imdb.com/title/tt0910970/',
    imdbRating: '8.4',
  },
  {
    title: 'District 9',
    year: '2009',
    genre: ['Action', 'Sci-fi', 'Thriller'],
    length: '1h 52min',
    mpaaRating: 'R',
    director: 'Neill Blomkamp',
    writers: ['Neill Blomkamp', 'Terri Tatchell'],
    starring: ['Sharlto Copley', 'David James', 'Jason Cope'],
    imdbLink: 'https://www.imdb.com/title/tt1136608/',
    imdbRating: '7.9',
  },
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to my top 10 movies!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// return list of movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then(movies => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// gets details for a movie by title
app.get('/movies/:Title', (req, res) => {
//  console.log(req.params.Title); used for debugging
    Movies.findOne({Title: req.params.Title})
    .then(movie => {
        res.status(201).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: '+ err);
    });
});

// gets all movies matching a genre
app.get('/movies/:Title/description', (req,res) => {
  Movies.findOne({Title: req.params.Title})
  .then(movie => {
      res.status(201).json(movie.Description);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: '+ err);
  });
});

// gets details of a director of a movie
app.get('/movies/:Title/director/', (req,res) => {
  Movies.findOne({Title: req.params.Title})
  .then(movie => {
      res.status(201).json(movie.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: '+ err);
  });
});

// gets details of a genre
app.get('/movies/genre/:Genre/', (req,res) => {
  Movies.findOne({'Genre.Name': req.params.Genre})
  .then(movie => {
      res.status(201).json(movie.Genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: '+ err);
  });
});

// gets details of a director by name
app.get('/movies/director/:Director/', (req,res) => {
  Movies.findOne({'Director.Name': req.params.Director})
  .then(movie => {
      res.status(201).json(movie.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: '+ err);
  });
});

// return list of users
app.get('/users', (req, res) => {
  Users.find()
  .then(users => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// adds a new user
app.post('/users', (req,res) => {
  Users.findOne({Username: req.body.Username})
  .then ((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists.');
    } else {
      Users
        .create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
        .then ((user) => {res.status(201).json(user) })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      })
     }
   })
   .catch((err) => {
     console.error(err);
     res.status(500).send('Error: ' + err);
   });
});


// gets info for user by username
app.get('/users/:username', (req, res) => {
  Users.findOne({ username: req.params.username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.username }, {
    $set:
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday
    }
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

// Add a movie to a user's list of favorites
app.post('/users/:username/movies/:movieID', (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, {
    $push: { favoriteMovies: req.params.movieID }
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

// Start the server
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
