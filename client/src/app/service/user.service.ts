import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, collection, collectionData, DocumentData } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface MovieData {
  title?: string;
  rating?: number;
  comment?: string;
  seen?: boolean;
  interested?: boolean;
  updated?: Date;
}


@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(private afs: Firestore, private auth: AuthService) { }

  // Save or update movie data for the user
  saveMovieData(movieId: string, data: MovieData): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const uid = await this.auth.getUserId();
        if (!uid) throw new Error('User not authenticated');

        const docRef = doc(this.afs, `users/${uid}/movies/${movieId}`);
        await setDoc(docRef, { ...data, updated: new Date() }, { merge: true });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Get specific movie data for the user
  getMovieData(movieId: string): Promise<DocumentData | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const uid = await this.auth.getUserId();
        if (!uid) throw new Error('User not authenticated');

        const docRef = doc(this.afs, `users/${uid}/movies/${movieId}`);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          resolve(snapshot.data());
        } else {
          resolve(undefined);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserMovies(): Observable<any[]> {
    return new Observable((observer) => {
      this.auth.getUserId().then((uid) => {
        if (!uid) {
          observer.error('User not authenticated');
        } else {
          const collectionRef = collection(this.afs, `users/${uid}/movies`);
          collectionData(collectionRef, { idField: 'id' }).subscribe({
            next: (movies) => {
              observer.next(movies);
              console.log("Fetched user movies:", movies);
              
            },
            error: (err) => {
              observer.error('Error fetching user movies: ' + err);
            },
            complete: () => observer.complete(),
          });
        }
      });
    });
  }
}
