import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MoviesList from '../MoviesList.vue'

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

    const wrapper = mount(MoviesList, { 
      props: { movies: movies } 
    });
    const movieTitleElement = wrapper.find(".movie:nth-child(2) .movie-title");
    expect(movieTitleElement.text()).toBe(movies[1].title);
  });
});
