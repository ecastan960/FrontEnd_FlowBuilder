import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CellsService {

  constructor(private firestore: AngularFirestore) { }
  agregarCelula(celula: any): Promise<any> {
    return this.firestore.collection('jointjs1').doc('proyecto1').set(celula);
  }

  getCelula(): Observable<any> {
    return this.firestore.collection('jointjs1').snapshotChanges();
  }
}
