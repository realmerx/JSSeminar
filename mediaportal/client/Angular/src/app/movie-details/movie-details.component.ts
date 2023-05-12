import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AppModule } from "../app.module";

interface MovieDetails {
  id: number;
  title: string;
  year: number;
  director: string;
  actors: string;
  genre: string;
  plot: string;
}

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"],
})

export class MovieDetailsComponent implements OnInit {
  id: number = 0;
  movie: Partial<MovieDetails> = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      this.http
        .get<MovieDetails>(`${AppModule.apiPrefix}/movies/${this.id}`)
        .subscribe((result) => (this.movie = result));
    });
  }
}
