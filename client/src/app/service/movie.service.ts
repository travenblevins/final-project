import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../interfaces/movies';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.TMDB_API_KEY;

  constructor(private http: HttpClient) {}

  private getDefaultParams(): HttpParams {
    return new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US');
  }

  getTopRatedMovies(): Observable<Movie[]> {
    return this.http
      .get<{ results: Movie[] }>(`${this.apiUrl}/movie/top_rated`, {
        params: this.getDefaultParams(),
      })
      .pipe(map((response) => response.results));
  }

  searchMovies(query: string): Observable<Movie[]> {
    const params = this.getDefaultParams().set('query', query);

    return this.http
      .get<{ results: Movie[] }>(`${this.apiUrl}/search/movie`, { params })
      .pipe(map((response) => response.results));
  }

  getMovieDetails(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/movie/${movieId}`, {
      params: this.getDefaultParams(),
    });
  }

  handleError(error: any): void {
    console.error('An error occurred:', error);
  }
}
