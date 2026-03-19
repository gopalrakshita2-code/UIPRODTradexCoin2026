import { Injectable } from '@angular/core';
import { Observable, tap,BehaviorSubject, of } from 'rxjs';
import { Apiservice } from '@/service/apiservice';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AItrading {

  constructor(private apiService: Apiservice, private http: HttpClient) {}
  
  getHistory(userEmail: string) {
    return this.apiService.post<any>(`ai-trade/user-ai-history`, { userEmail });
  }
}
