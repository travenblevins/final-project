import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../service/user.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  standalone: true,
  imports: [MatCardModule, CommonModule],
})
export class MovieListComponent implements OnInit {
  seenMovies: any[] = [];
  interestedMovies: any[] = [];

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.userDataService.getUserMovies().subscribe({
      next: (movies) => {
        this.seenMovies = movies.filter(m => m.seen);
        this.interestedMovies = movies.filter(m => m.interested);
      },
      error: (err) => {
        console.error('Error fetching user movies:', err);
      },
    });
  }
}
