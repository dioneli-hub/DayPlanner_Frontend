import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/api-models/task.model';
import { environment } from 'src/environments/environment';

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

  formatDate(date){
    return dateTimeFormat.format(date);
  }



}

const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
});