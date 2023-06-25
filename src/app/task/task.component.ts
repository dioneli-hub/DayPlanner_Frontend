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
    console.log('emmiter in task component')
    this.deleteTask.emit(taskToDelete);
    // this.deleteTaskBoardDetails.emit(taskToDelete);
  }

  complete(taskToComplete: TaskModel){
    console.log('complete emmiter in task component')
    console.log(taskToComplete)
    //this.completeTask.emit(taskToComplete);
    this.tasksService
        .completeTask(taskToComplete.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(()=>{
          //console.log("on complete task in task")
          this.task.isCompleted = true;
          
        })  
  }



  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
