import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppModule } from "./app.module";

interface MovieModel {
  id: number;
  title: string;
  year: number;
  genre: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
  title = "Angular Movies";
  id: number = 0;
  movies: MovieModel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    AppModule.apiPrefix
    this.http
      .get<MovieModel[]>(`${AppModule.apiPrefix}/movies`)
      .subscribe((result) => (this.movies = result));
  }
}
