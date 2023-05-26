<template>
    <div id="movie-details">
        <h2>Movie details</h2>
        <div>{{movie.title}}</div>
        <div>{{movie.plot}}</div>
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