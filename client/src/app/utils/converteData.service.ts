import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})
export class ConverteDataService {

constructor() { }

converteData(data: any): Object {
  const datePipe = new DatePipe('pt-Br');
  return datePipe.transform(data.seconds * 1000, 'dd/MM/yyyy');
}

}
