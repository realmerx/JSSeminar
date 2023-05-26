<template>
    <div id="movies-list">
        <div class="movie" v-for="movie in movies">
            <div>{{movie.id}}</div>
            <div>{{movie.title}}</div>
            <div>{{movie.genre}}</div>
            <button v-on:click="selectMovie(movie.id)">View</button>
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
            selectMovie(sid: number) {
                this.$emit('select-movie', sid)
            }
        }
    }
</script>