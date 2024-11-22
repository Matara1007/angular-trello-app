// src/app/services/board.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private apiUrl = 'http://localhost:8080/api/lists';

  constructor(private http: HttpClient) {}

  getLists(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  addLists(list: { name: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, list);
  }

  // Fetch lists by board_id
  getListsByBoardId(boardId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/by-board/${boardId}`);
  }
}
