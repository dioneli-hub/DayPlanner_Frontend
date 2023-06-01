import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { BoardModel } from "../api-models/board.model";
import { environment } from "../environments/environment";
import { TaskModel } from "src/api-models/task.model";

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

    addTaskToBoard(value: any) : Observable<TaskModel>{
      console.log(value)
      return this.httpClient.post<TaskModel>(`${environment.apiUrl}Board/${value.board.id}/tasks`,{
        text: value.taskText,
        dueDate: new Date(Date.UTC(value.taskDueDate.year, value.taskDueDate.month-1, value.taskDueDate.day))
      })
    }

    getBoardById(boardId: number): Observable<BoardModel>{
      return this.httpClient.get<BoardModel>(`${environment.apiUrl}Board/${boardId}`)
    }
  }

