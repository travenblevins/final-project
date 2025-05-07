import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:4000/api/movies';

  constructor(private http: HttpClient) { }

  getTopRatedMovies(): Observable<Movie[]> {
  return this.http.get<{ results: Movie[] }>(`${this.apiUrl}/top-rated`)
    .pipe(
      map(response => response.results)  // Extract the "results" array
    );
}
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, {
      params: { q: query }
    }).pipe(
      map(response => response)
    );
  }

  handleError(error: any): void {
    console.error('An error occurred:', error);
  }

}
