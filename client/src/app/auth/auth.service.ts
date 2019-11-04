import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from './usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, throwError, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private userCollection: AngularFirestoreCollection<Usuario> = this.afs.collection('users');

constructor(private afs: AngularFirestore,
            private afAuth: AngularFireAuth) { }

register(usuario: Usuario): Observable<boolean> {
  return from(this.afAuth.auth
            .createUserWithEmailAndPassword(usuario.email, usuario.password))
              .pipe(
                switchMap((u: firebase.auth.UserCredential) =>
                  this.userCollection.doc(u.user.uid)
                    .set({...usuario, id: u.user.uid})
                    .then(() => true)
                ),
                catchError((err) => throwError(err))
              );
}

login(email: string, password: string): Observable<Usuario> {

  return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
            .pipe(
              switchMap((u: firebase.auth.UserCredential) => this.userCollection.doc<Usuario>(u.user.uid).valueChanges()),
              catchError(() => throwError('Credencial Inválida ou usuário não registrado.'))
            );
}

logout() {
  this.afAuth.auth.signOut();
}

getUser(): Observable<Usuario> {
  return this.afAuth.authState
    .pipe(
      switchMap(u => (u) ? this.userCollection.doc<Usuario>(u.uid).valueChanges() : of(null))
    );
}

authenticated(): Observable<boolean> {
  return this.afAuth.authState
    .pipe(
      map(u => (u) ? true : false)
    );
}

async updateUserData(u: auth.UserCredential) {
  try {

      const newUser: Usuario = {
        nome: u.user.displayName,
        email: u.user.email, password: '',
        _id: u.user.uid
      };

      await this.userCollection.doc(u.user.uid)
                            .set(newUser);
      return newUser;

    } catch (error) {
      throw new Error(error);
    }
}

}


