import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(this.auth, provider);
}
}
