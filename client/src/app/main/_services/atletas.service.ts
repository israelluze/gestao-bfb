import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Atleta } from '../_models/atleta';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class AtletasService {

  private atletasCollection: AngularFirestoreCollection<Atleta> = this.afs.collection('atletas');
  atleta: Atleta;
constructor(private afs: AngularFirestore) { }

  getAtletas(): Observable<Atleta[]> {

    return this.atletasCollection.valueChanges();

  }

  addAtleta(a: Atleta) {

    a.id = this.afs.createId();
    this.atletasCollection.doc(a.id).set(a);
  }

  deleteAtleta(id: string) {
    this.atletasCollection.doc(id).delete();
  }

  updateAtleta(a: Atleta) {
    return this.atletasCollection.doc(a.id).set(a);
  }

  procuraPorNome(nome: string): Observable<Atleta[]> {
    return this.afs.collection<Atleta>('atletas',
      ref => ref.orderBy('nome').startAt(nome).endAt(nome+"\uf8ff"))
      .valueChanges();
  }
  procuraPorId(id: string): Observable<Atleta> {

    // this.atletasCollection.doc<Atleta>(id).valueChanges().subscribe((a: Atleta) => this.atleta = a);
    return this.atletasCollection.doc<Atleta>(id).valueChanges();
  }
}
