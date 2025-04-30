import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../interfaces/movies';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-movie',
  imports: [MatFormFieldModule, FormsModule, CommonModule, MatInputModule, MatCardModule, HttpClientModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent implements OnInit {
  movies: Movie[] | undefined;

  constructor(
    private movieService: MovieService
  ) { }

  searchText: string = '';

  ngOnInit() {
    this.movies = this.movieService.sampleMovies; // Load sample movies initially
  }

  clearSearch() {
    this.searchText = '';
  }

  // loadMovies() { 
  //   this.movieService.getMovies().subscribe((data: Movie[]) => {
  //     this.movies = data;
  //   });
  // }
}
