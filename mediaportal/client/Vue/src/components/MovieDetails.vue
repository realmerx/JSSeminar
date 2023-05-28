<template>
    <div id="movie-details">
        <h2 id="movie-title">{{movie.title}}</h2>
        <p class="movie-plot">{{movie.plot}}</p>
    </div>
</template>

<script lang="ts">
    import type { DetailedMovie } from './types';
    import type { PropType } from 'vue';
    export default {
        props: {
            movie: {
                type: Object as PropType<DetailedMovie>,
                required: true
            },
        },
    }
</script>