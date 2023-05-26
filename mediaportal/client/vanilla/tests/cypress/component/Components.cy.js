import {MovieDetailsComponent, MoviesListComponent} from '../../../framework'
import '../../../app.css'

const rootApp = {
  movies: [
    { id: 1, title: 'Test movie1', genre: 'Testgenre' },
    { id: 2, title: 'Test movie2', genre: 'Testgenre' }
  ],
  
  movie: { 
    title: 'Test movie1',
    plot: 'Testplot' 
  }
}

describe('Components', () => {
  it('MovieDetails', () => {
    mount('movie-details', MovieDetailsComponent, { 'bind-movie': 'movie' }, rootApp)

    cy.contains('Movie details')
    cy.contains('Test movie')
    cy.contains('Testplot')
  })

  it('MoviesList', () => {
    mount('movies-list', MoviesListComponent, { 'bind-movies': 'movies' }, rootApp)
    
    for(let step = 1; step <=2; step++) {
      cy.contains(`Test movie${step}`)
    }
  })
  
})

function mount(name, componentClass, props, rootApp) {
  customElements.define(name, componentClass)
  document.querySelector('[data-cy-root]').innerHTML = `<${name} ${Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(' ')}></${name}>`
  const comp = document.querySelector(name)
  comp.rootApp = rootApp
  comp.initialize();
}