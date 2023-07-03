import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { TaskModel } from "../api-models/task.model";
import { environment } from "../environments/environment";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class TasksService {
    constructor(private httpClient: HttpClient) {
    }
  
    getTasks(): Observable<Array<TaskModel>> {
      return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}taskItem`);
    }

    getUsersTasks(userId: number): Observable<Array<TaskModel>> {
      return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}TaskItem/${userId}/users-tasks`);
    }

    getTodaysUsersTasks(userId: number): Observable<Array<TaskModel>> {
      return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}TaskItem/${userId}/users-todays-tasks`);
    }

    getBoardTasks(boardId: number): Observable<Array<TaskModel>> {
      return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}TaskItem/${boardId}/get-board-tasks`);
    }

    getTodaysUserBoardsTasks(userId: number): Observable<Array<TaskModel>> {
      return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}TaskItem/${userId}/user-boards-todays-tasks`);
    }

    getUserBoardsTasks(boardId: number): Observable<Array<TaskModel>> {
      return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}TaskItem/${boardId}/user-boards-tasks`);
    }

    deleteTask(taskId: number): Observable<void>{
      return this.httpClient.delete<void>(`${environment.apiUrl}TaskItem/${taskId}`);
    }

    completeTask(taskId: number){
      return this.httpClient.post(`${environment.apiUrl}TaskItem/${taskId}/complete-task`, 
      {},
      {responseType: 'text'}
      );
    }
    

    markAsToDo(taskId: number)  {
      return this.httpClient.post(
        `${environment.apiUrl}TaskItem/${taskId}/mark-task-as-todo`, 
        {},
        {responseType: 'text'}
        );
    }
}