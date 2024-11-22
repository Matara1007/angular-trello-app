// src/app/services/board.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = 'http://localhost:8080/api/boards';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }
  
  addBoard(board: { name: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, board);
  }
}
