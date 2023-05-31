import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/api-models/task.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  taskDate: Date;

  @Input() task: TaskModel;
  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.dateFormat(this.task.dueDate)
  }
 
  
  onDeleteTask(taskId: number){
    this.http.delete(`${environment.apiUrl}TaskItem/${taskId}`)
    .subscribe();
  }


  dateFormat (date) {
    this.taskDate = date.replace('T', ' ').substring(0, 19)
    };
  }
