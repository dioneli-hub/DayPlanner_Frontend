import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { TaskModel } from "../api-models/task.model";
import { environment } from "../environments/environment";

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

}