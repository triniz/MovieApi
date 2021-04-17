// Import modules
const express = require('express');
const morgan = require('morgan'); //For Logging

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
let topMovies = [
  {
    title: 'Black Panther'
  },
  {
    title: 'Avengers: Endgame'
  },
  {
    title: 'Mission: Impossible - Fallout'
  },
  {
    title: 'Mad Max: Fury Road'
  },
  {
    title: 'Spider-Man: Into the Spider-Verse'
  },
  {
    title: 'Wonder Woman'
  },
  {
    title: 'Dunkirk'
  },
  {
    title: 'Coco'
  },
  {
    title: 'Thor: Ragnarok',
  },
  {
    title: 'Logan',
  }
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to my top 10 movies!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Start the server
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
