<template>
  <MoviesList :movies="movies" v-on:select-movie="selectMovie"/>
  <MoviesDetails v-if="selectedMovie" :movie="selectedMovie"/>
</template>

<script setup lang="ts">
  import MoviesList from './components/MoviesList.vue'
  import type { Movie, DetailedMovie } from './components/types';
  import MoviesDetails from './components/MovieDetails.vue'
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const apiPrefix = "http://localhost:3000";

  let movies: Ref<Movie[]> = ref([]);
  let selectedMovie: Ref<DetailedMovie | undefined> = ref(undefined);

  async function fetchMovies() {
      const response = await fetch(`${apiPrefix}/movies`);
      const data = await response.json();
      movies.value = data;
  }

  async function selectMovie(id: number) {
    const response = await fetch(`${apiPrefix}/movies/${id}`);
    const data = await response.json();
    selectedMovie.value = data;
  }

  fetchMovies()

</script>
