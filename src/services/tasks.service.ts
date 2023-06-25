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

    deleteTask(taskId: number): Observable<void>{
      return this.httpClient.delete<void>(`${environment.apiUrl}TaskItem/${taskId}`);
    }

    completeTask(taskId: number){
      console.log("completeTask service log")
      return this.httpClient.post<void>(`${environment.apiUrl}TaskItem/${taskId}/complete-task`, {});
    }
}