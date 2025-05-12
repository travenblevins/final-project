import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movies';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie.service';
import { CommonModule, Location } from '@angular/common';
import { UserDataService } from '../../service/user.service';  // Assuming this is the service for handling user data
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule]
})
export class MovieComponent implements OnInit {
  movieId!: string;
  movieDetails!: Movie;
  seen: boolean = false;
  interested: boolean = false;
  userRating: number = 0;
  userComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private userDataService: UserDataService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieId = id;
      this.fetchMovieDetails();
    } else {
      console.error('No movie ID found');
    }
  }

  fetchMovieDetails(): void {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (movie: Movie) => {
        this.movieDetails = movie;
        console.log('Fetched movie details:', this.movieDetails);
        this.loadUserData(); // Load user data when movie details are fetched
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      },
    });
  }

  loadUserData(): void {
  this.userDataService.getMovieData(this.movieId).then((data) => {
    if (data) {
      this.seen = data['seen'] ?? false;
      this.interested = data['interested'] ?? false;
      this.userRating = data['rating'] ?? 0;
      this.userComment = data['comment'] ?? '';
    }
  }).catch((error) => {
    console.error('Error loading user data:', error);
  });
}

  toggleSeen(): void {
    this.seen = !this.seen;
    this.updateMovieData();
  }

  toggleInterested(): void {
    this.interested = !this.interested;
    this.updateMovieData();
  }

  updateRating(rating: number): void {
    this.userRating = rating;
    this.updateMovieData();
  }

  updateComment(comment: string): void {
    this.userComment = comment;
    this.updateMovieData();
  }

  updateMovieData(): void {
    const movieData = {
      seen: this.seen,
      interested: this.interested,
      rating: this.userRating,
      comment: this.userComment
    };

    this.userDataService.saveMovieData(this.movieId, movieData)
      .then(() => {
        console.log('User movie data updated successfully');
      })
      .catch((err) => {
        console.error('Error updating movie data:', err);
      });
  }

  goBack(): void {
    this.location.back();
  }
}
