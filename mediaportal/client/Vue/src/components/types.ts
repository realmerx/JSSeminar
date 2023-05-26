export interface Movie {
    id: number;
    title: string;
    genre: string;
    year: number, 
}

export interface DetailedMovie extends Movie {
    director: string;
    actors: string[];
    plot: string;
}