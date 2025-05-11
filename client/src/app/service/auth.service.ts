import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, getIdToken } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
      if (user) {
        // Automatically store the token in localStorage when the user logs in
        getIdToken(user).then((token) => {
          localStorage.setItem('idToken', token);
        });
      } else {
        // Clear the token when the user logs out
        localStorage.removeItem('idToken');
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    const token = await getIdToken(userCredential.user);
    localStorage.setItem('idToken', token); // Store the token in localStorage
  }

  logout() {
    localStorage.removeItem('idToken'); // Remove the token from localStorage
    return signOut(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  async getUserId(): Promise<string | null> {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider).then(async (result) => {
      const token = await getIdToken(result.user);
      localStorage.setItem('idToken', token); // Store the token in localStorage
    });
  }
}