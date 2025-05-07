import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../interfaces/movies';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent implements OnInit {
  movies: Movie[] = [];
  searchText: string = '';
  isLoading = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadTopRatedMovies();
  }

  onSearch() {
    if (!this.searchText.trim()) {
      this.loadTopRatedMovies();
      return;
    }

    this.isLoading = true;
  this.movieService.searchMovies(this.searchText).subscribe({
    next: (response: { results: Movie[] }) => {
      this.movies = response.results;
      this.isLoading = false;
    },
    error: err => {
      this.movieService.handleError(err);
      this.isLoading = false;
    }
  });

  }

  loadTopRatedMovies() {
  this.isLoading = true;
  this.movieService.getTopRatedMovies().subscribe({
    next: (movies: Movie[]) => {
      console.log('movies', movies);
      this.movies = movies;
      this.isLoading = false;
    },
    error: err => {
      this.movieService.handleError(err);
      this.isLoading = false;
    }
  });
}

  clearSearch() {
    this.searchText = '';
    this.loadTopRatedMovies();
  }
}
