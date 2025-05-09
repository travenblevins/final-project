import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movies';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  movieId!: string;
  movieDetails!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id')!;
    this.fetchMovieDetails();
  }

  fetchMovieDetails(): void {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (movie: Movie) => {        
        this.movieDetails = movie;
        console.log('Fetched movie details:', this.movieDetails);      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

}
