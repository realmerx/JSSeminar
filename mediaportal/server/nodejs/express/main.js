const express = require('express');
const app = express();
const allowedClientOrigin = "http://127.0.0.1:15500";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedClientOrigin);
  next();
} );

app.get('/movies', (req, res) => {
  res.send(movies.map(movie => ({ 
    id: movie.id,
    title: movie.title, 
    year: movie.year, 
    genre: movie.genre 
  })));
}); 

app.get('/movies/:id', (req, res) => {
  const movie = movies.find(movie => movie.id === parseInt(req.params.id));
  if (!movie) {
    res.status(404).send('Movie not found');
  }
  res.send(movie);
} );

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const movies = [
  {
      id: 1,
      title: 'The Godfather',
      year: 1972,
      director: 'Francis Ford Coppola',
      actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
      genre: 'Crime',
      plot: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
  },
  {
      id: 2,
      title: 'The Shawshank Redemption',
      year: 1994,
      director: 'Frank Darabont',
      actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
      genre: 'Crime',
      plot: 'This is the plot of Shawshank Redemption'
  },
  {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      director: 'Christopher Nolan',
      actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      genre: 'Action',
      plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
  },
  {
      id: 4,
      title: 'The Godfather: Part II',
      year: 1974,
      director: 'Francis Ford Coppola',
      actors: ['Al Pacino', 'Robert De Niro', 'Robert Duvall'],
      genre: 'Crime',
      plot: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.'
    },
    {
      id: 5,
      title: '12 Angry Men',
      year: 1957,
      director: 'Sidney Lumet',
      actors: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam'],
      genre: 'Crime',
      plot: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.'
    },
    {
      id: 6,
      title: 'Schindler\'s List',
      year: 1993,
      director: 'Steven Spielberg',
      actors: ['Liam Neeson', 'Ben Kingsley', 'Oliver Stone'],
      genre: 'Biography',
      plot: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.'
    },
    {
      id: 7,
      title: 'Pulp Fiction',
      year: 1994,
      director: 'Quentin Tarantino',
      actors: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
      genre: 'Crime',
      plot: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'
    },
    {
      id: 8,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
      director: 'Peter Jackson',
      actors: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
      genre: 'Fantasy',
      plot: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.'
    },
    {
      id: 9,
      title: 'The Lord of the Rings: The Two Towers',
      year: 2002,
      director: 'Peter Jackson',
      actors: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
      genre: 'Fantasy',
      plot: 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard.'
    
    }
];
