import { Component, Input } from '@angular/core';
import { TaskModel } from 'src/app/api-models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: TaskModel;
  
}
