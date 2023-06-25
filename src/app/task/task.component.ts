import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskModel } from 'src/api-models/task.model';
import { TasksService } from 'src/services/tasks.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  taskDate: Date;

  @Input() 
  task: TaskModel | null = null;

  @Output()
  deleteTask = new EventEmitter<TaskModel>();

  @Output()
   completeTask = new EventEmitter<TaskModel>();

  constructor(
    private tasksService: TasksService,
    ) {}
   
  // deleteTaskBoardDetails = new EventEmitter<TaskModel>();


  ngOnInit(): void {
    this.dateFormat(this.task.dueDate)
  }

 
  
  dateFormat (date) {
    this.taskDate = date.replace('T', ' ').substring(0, 10)
    };


  delete(taskToDelete: TaskModel) {
    this.deleteTask.emit(taskToDelete);
  }

  complete(taskToComplete: TaskModel){
    this.tasksService
        .completeTask(taskToComplete.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(()=>{
          this.task.isCompleted = true;
        })  
  }

  markAsToDo(taskToMark: TaskModel){
    this.tasksService
        .markAsToDo(taskToMark.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res)=>{
          console.log(res)
          this.task.isCompleted = false;
        })  
  }



  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
