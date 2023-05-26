import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { BoardModel } from "../api-models/board.model";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class BoardsService {
    constructor(private httpClient: HttpClient) {
    }

    createBoard(boardName: string): Observable<BoardModel> {
      return this.httpClient.post<BoardModel>(`${environment.apiUrl}Board/`, {
        name: boardName,
      });
    }

    deleteBoard (boardId: number): Observable<void>{
      return this.httpClient.delete<void>(`${environment.apiUrl}Board/${boardId}`)}

}