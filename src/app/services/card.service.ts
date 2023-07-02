import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private appUrl = "https://localhost:7176/";
  private apiUrl = 'api/card/';

  constructor( private http: HttpClient) { }

  getCardList(): Observable<any> {
    return this.http.get(this.appUrl + this.apiUrl);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete(this.appUrl + this.apiUrl + id);
  }

  saveCard(card: any): Observable<any>  {
    return this.http.post(this.appUrl + this.apiUrl, card);
  }

  updateCard(id: number, card: any): Observable<any> {
    return this.http.put(this.appUrl + this.apiUrl + id, card);
  }
}
