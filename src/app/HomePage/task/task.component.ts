import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/app/api-models/task.model';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: TaskModel;
  constructor(private http: HttpClient){

  }
  
  onDeleteTask(taskId: number){
    this.http.delete(`${environment.apiUrl}TaskItem/${taskId}`)
    .subscribe();
  }
}
