<template>
    <div id="movies-list">
        <div class="movie" v-for="movie in movies" data-cy="movie">
            <div>{{movie.id}}</div>
            <div class="movie-title">{{movie.title}}</div>
            <div>{{movie.genre}}</div>
            <button v-on:click="selectMovie(movie.id)" data-cy="movie-show-details">View</button>
        </div>
    </div>
</template>

<script lang="ts">
    import type { Movie } from './types';
    import type { PropType } from 'vue';
    export default {
        props: {
            movies: Array as PropType<Movie[]>
        },
        methods: {
            selectMovie(id: number) {
                this.$emit('select-movie', id)
            }
        }
    }
</script>