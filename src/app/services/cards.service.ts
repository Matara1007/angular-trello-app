// src/app/services/cards.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private apiUrl = 'http://localhost:8080/api/cards';

  constructor(private http: HttpClient) {}

  // Fetch all cards
  getCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  addCard(card: { title: string, content: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, card);
  }

  // Fetch cards by list_id
  getCardsByListId(listId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-list/${listId}`);
  }

  removeCard(cardId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${cardId}`);
  }
}
