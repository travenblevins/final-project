import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [MatCardModule, CommonModule]
})
export class MovieListComponent implements OnInit {
  interestedMovies: any[] = [];
  seenMovies: any[] = [];
  userId: string = 'newuser1@gmail.com'; // Replace with dynamic user ID if needed

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadUserMovies();
  }

  loadUserMovies(): void {
    this.movieService.getUserMovies(this.userId).subscribe({
      next: (data) => {
        this.interestedMovies = data.interestedMovies;
        this.seenMovies = data.seenMovies;
      },
      error: (err) => {
        console.error('Error fetching user movies:', err);
      },
    });
  }
}