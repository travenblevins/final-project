import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../service/user.service';
import { MovieService } from '../../service/movie.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(
    private userDataService: UserDataService,
    private movieService: MovieService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const userMovies = await new Promise<any[]>((resolve, reject) => {
        this.userDataService.getUserMovies().subscribe({
          next: resolve,
          error: reject,
        });
      });

      const seenList = [];
      const interestedList = [];

      for (const userMovie of userMovies) {
        try {
          const details = await this.movieService.getMovieDetails(userMovie.id).toPromise();
          const merged = { ...details, ...userMovie };

          if (userMovie.seen) seenList.push(merged);
          if (userMovie.interested) interestedList.push(merged);
        } catch (err) {
          console.error(`Failed to fetch details for movie ${userMovie.id}:`, err);
        }
      }

      this.seenMovies = seenList;
      this.interestedMovies = interestedList;
    } catch (err) {
      console.error('Error fetching user movies:', err);
    }
  }
  goToMovie(id: string): void {
    this.router.navigate(['/movie', id]);
  }
}
