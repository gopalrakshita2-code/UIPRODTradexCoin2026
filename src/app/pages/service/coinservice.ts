import { Injectable } from '@angular/core';
export interface Coin {
  name: string;
  code: string;
  image: string;
}
@Injectable({
  providedIn: 'root'
})
export class Coinservice {
  
}
