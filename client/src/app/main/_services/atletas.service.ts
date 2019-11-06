import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Atleta } from '../_models/atleta';
import { Observable, pipe } from 'rxjs';
import { ConverteDataService } from 'src/app/utils/converteData.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtletasService {

  private atletasCollection: AngularFirestoreCollection<Atleta> = this.afs.collection('atletas');
  atleta: Atleta;
constructor(private afs: AngularFirestore, private converte: ConverteDataService) { }

  getAtletas(): Observable<Atleta[]> {

    return this.atletasCollection.valueChanges();

  }

  addAtleta(a: Atleta) {

    a.id = this.afs.createId();
    a.dataNascimento = new Date(a.dataNascimento);
    a.dataCarteira = new Date(a.dataCarteira);
    return this.atletasCollection.doc(a.id).set(a);
  }

  deleteAtleta(id: string) {
    return this.atletasCollection.doc(id).delete();
  }

  updateAtleta(a: Atleta) {
    a.dataNascimento = new Date(a.dataNascimento);
    a.dataCarteira = new Date(a.dataCarteira);
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

  geraIdAtleta() {
    return this.afs.createId();
  }
}
