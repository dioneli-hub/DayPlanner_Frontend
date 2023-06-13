import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskModel } from 'src/api-models/task.model';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  //private destroy$ = new Subject<void>();
  taskDate: Date;

  @Input() 
  task: TaskModel | null = null;

  @Output()
  deleteTask = new EventEmitter<TaskModel>();
  // deleteTaskBoardDetails = new EventEmitter<TaskModel>();


  ngOnInit(): void {
    this.dateFormat(this.task.dueDate)
  }
  
  dateFormat (date) {
    this.taskDate = date.replace('T', ' ').substring(0, 10)
    };


  delete(taskToDelete: TaskModel) {
    // this.tasksService.deleteTask(taskToDelete.id)
    // .pipe(takeUntil(this.destroy$))
    // .subscribe()
    console.log('emmiter in task component')
    this.deleteTask.emit(taskToDelete);
    // this.deleteTaskBoardDetails.emit(taskToDelete);
  }



  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }
}
