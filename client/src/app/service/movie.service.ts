import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key'

  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<Movies[]> {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${encodeURIComponent(query)}`;
    return this.http.get<Movies[]>(apiUrl);
  }


  handleError(error: any): void {
    console.error('An error occurred:', error);
  }
}
