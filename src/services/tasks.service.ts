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

    getBoardTasks(boardId: number, ifMyTasks:boolean): Observable<Array<TaskModel>> {
      return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}TaskItem/${boardId}/get-board-tasks/if-my-${ifMyTasks}`);
    }

    getBoardTasksGroupedByCompleted(boardId: number, ifMyTasks: boolean) {
      return this.httpClient.get<Array<any>>(`${environment.apiUrl}TaskItem/${boardId}/get-board-tasks/grouped-by-completed/if-my-${ifMyTasks}`);
    }

    getBoardTasksGroupedByPerformer(boardId: number) {
      return this.httpClient.get<Array<any>>(`${environment.apiUrl}TaskItem/${boardId}/get-board-tasks/grouped-by-performer`);
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

    updateTask(taskId: number, task: TaskModel){
      return this.httpClient.patch(`${environment.apiUrl}TaskItem/${taskId}`, 
      {...task},
      );
    }
        

    markAsToDo(taskId: number)  {
      return this.httpClient.post(
        `${environment.apiUrl}TaskItem/${taskId}/mark-task-as-todo`, 
        {},
        {responseType: 'text'}
        );
    }

    UpdateTaskPerformer(taskId: number, newPerformerId:number)  {
      return this.httpClient.patch(
        `${environment.apiUrl}TaskItem/${taskId}/update-performer/${newPerformerId}`, 
        {},
        // {responseType: 'text'}
        );
    }

    UpdateTaskOverdue(taskId: number)  {
      return this.httpClient.patch(
        `${environment.apiUrl}TaskItem/${taskId}/update-overdue`, 
        {},
        // {responseType: 'text'}
        );
    }

    addRecurrence(taskId: number, recurringType: number, occurencesNumber: number)  {
      return this.httpClient.post(
        `${environment.apiUrl}TaskItem/add-recurrence`, 
        {"taskId": taskId,
        "recurringType": 1, //real value
        "occurencesNumber": occurencesNumber},
        // {responseType: 'text'}
        );
    }

    
}





    // getTasks(): Observable<Array<TaskModel>> {
    //   return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}taskItem`);
    // }

    // getUsersTasks(userId: number): Observable<Array<TaskModel>> {
    //   return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}TaskItem/${userId}/users-tasks`);
    // }

    // getTodaysUsersTasks(userId: number): Observable<Array<TaskModel>> {
    //   return this.httpClient.get<Array<TaskModel>>(`${environment.apiUrl}TaskItem/${userId}/users-todays-tasks`);
    // }