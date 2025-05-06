import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-list',
  imports: [MatCardModule, CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  movies = [
    {
      id: 1,
      title: 'Inception',
      posterPath:
        'https://image.tmdb.org/t/p/w200/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      runtime: 148,
      releaseDate: '2010-07-16',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      posterPath:
        'https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      runtime: 152,
      releaseDate: '2008-07-18',
    },
    {
      id: 3,
      title: 'Interstellar',
      posterPath:
        'https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      runtime: 169,
      releaseDate: '2014-11-07',
    },
  ];
  watchedMovies = this.movies;
}
