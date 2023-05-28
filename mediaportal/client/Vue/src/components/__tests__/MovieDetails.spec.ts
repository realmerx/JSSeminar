import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MovieDetails from '../MovieDetails.vue'

describe('Movie list tests', () => {
  it('shows movie plot', () => {
    const movie = {
        id: 8,
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
        director: 'Peter Jackson',
        actors: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
        genre: 'Fantasy',
        plot: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.'
    };

    const wrapper = mount(MovieDetails, { 
        props: { movie: movie } 
    });
    const moviePlotElement = wrapper.find(".movie-plot");
    expect(moviePlotElement.text()).toBe(movie.plot);
  });
});
