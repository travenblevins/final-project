import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MoviePayload {
  movieId: string;
  title?: string;
  comment?: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api/users'; // Update if needed

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Or use a token service
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  addToInterested(userId: string, payload: MoviePayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/interested`, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  addToSeen(userId: string, payload: MoviePayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/seen`, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  removeFromInterested(userId: string, movieId: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${userId}/interested`, {
      headers: this.getAuthHeaders(),
      body: { movieId },
    });
  }

  removeFromSeen(userId: string, movieId: string): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/${userId}/seen`, {
      headers: this.getAuthHeaders(),
      body: { movieId },
    });
  }
}
