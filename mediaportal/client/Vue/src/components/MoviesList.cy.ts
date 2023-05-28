import MoviesList from './MoviesList.vue'

describe('Movie list tests', () => {
  it('shows correct title on second item', () => {
    const movies = [{
      id: 7,
      title: 'Pulp Fiction',
      genre: 'Crime'
    },
    {
      id: 8,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      genre: 'Fantasy'
    },
    {
      id: 9,
      title: 'The Lord of the Rings: The Two Towers',
      genre: 'Fantasy'
    }];

    cy.mount(MoviesList, {
      props: { movies: movies }
    });

    cy.get(".movie:nth-child(2) .movie-title").should("have.text", movies[1].title);
  })
});
