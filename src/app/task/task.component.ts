import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskModel } from 'src/api-models/task.model';
import { UserModel } from 'src/api-models/user.model';
import { NotificationsService } from 'src/services/notifications.service';
import { TasksService } from 'src/services/tasks.service';
import { UsersService } from 'src/services/users.service';
import { HomeContentComponent } from '../HomePage/home-content/home-content.component';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  boardMembers: Array<UserModel> = undefined;
  performerId: number = null;
  boardId:number;
  currentUserId: number = null
  taskCreatorId: number = null;
  newTaskDueDate = null;
  minDate = undefined;
  homeComponent: HomeContentComponent

  @Input() 
  task: TaskModel | null = null;

  @Output() deleteTask = new EventEmitter<TaskModel>();
  @Output() completeTask = new EventEmitter<TaskModel>();
  @Output() dueDateUpdated = new EventEmitter<TaskModel>();

  constructor(
    private tasksService: TasksService,
    private viewContainerRef: ViewContainerRef,
    private usersService: UsersService,
    private notificationsService: NotificationsService
    ) {

    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    }
   


  ngOnInit(): void {
    this.boardId = this.task.boardId;
    if (this.boardId) {
      this.usersService
        .getBoardMembers(this.boardId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(boardMembers => {
          this.boardMembers = boardMembers;
        });}

  if(this.task.performerId != null && this.task.performer != null){
    this.performerId = this.task.performerId;
  }

  this.taskCreatorId = this.task.creatorId;
  this.usersService
    .current()
    .subscribe((currentUser)=>{
      this.currentUserId = currentUser.id;
    })
}


// calculateOverdue(){
//   let taskDueDate = new Date(this.task.dueDate);
//   let now = new Date(new Date().toDateString());

//   console.log(taskDueDate < now)
//   this.task.isOverdue = (taskDueDate < now) && this.task.isCompleted == false?
//                     true : false;

// }


get taskPerformerInfo(){
  return this.performerId == null? 
        'No performer' 
        : `${this.task.performer.firstName} ${this.task.performer.lastName}`;
}

get taskStatus(){
  return this.task.isCompleted? '(Done)' 
       : this.task.isOverdue? '(Overdue)':'(ToDo)'
}

get taskBgColor(){
  return this.task.isCompleted? '#ecffd4' 
       : this.task.isOverdue? '#f7c3c3' : '#fbfcb8'
}

get taskDueDate(){
  return new Date(this.task.dueDate).toISOString().replace('T', ' ').substring(0, 10);
  }


  updatePerformer(){
        this.tasksService
      .UpdateTaskPerformer(this.task.id, this.performerId)
      .subscribe((task: TaskModel)=>{
        this.task.performer = task.performer;
        this.task.performerId = task.performerId;
      })
   }

   updateTaskDueDate(){
    let taskDueDate = new Date(Date.UTC(this.newTaskDueDate.year, this.newTaskDueDate.month-1, this.newTaskDueDate.day))
    this.task.dueDate =  taskDueDate;
    this.tasksService.updateTask(this.task.id, this.task)
  .subscribe((task: TaskModel)=>{
    this.task.dueDate = task.dueDate;
    
    this.tasksService
            .UpdateTaskOverdue(this.task.id)
            .subscribe((task: TaskModel)=>{
              this.task.isOverdue = task.isOverdue;
              this.task.isCompleted = task.isCompleted;
            })
  })
}
 
  
  // dateFormat (date) {
  //   if(typeof(date) == 'string'){
  //     this.taskDate = date.replace('T', ' ').substring(0, 10);
  //   } else {
  //     this.taskDate = date.toISOString().replace('T', ' ').substring(0, 10);
  //   }
  //   };


  delete(taskToDelete: TaskModel) {
    this.deleteTask.emit(taskToDelete);
  }

  complete(taskToComplete: TaskModel){
    this.tasksService
        .completeTask(taskToComplete.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(()=>{
          this.task.isCompleted = true;
          this.tasksService
            .UpdateTaskOverdue(this.task.id)
            .subscribe((task: TaskModel)=>{
              this.task.isOverdue = task.isOverdue;
            })
        })  
  }

  markAsToDo(taskToMark: TaskModel){
    this.tasksService
        .markAsToDo(taskToMark.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(()=>{
          this.task.isCompleted = false;
          this.tasksService
            .UpdateTaskOverdue(this.task.id)
            .subscribe((task: TaskModel)=>{
              this.task.isOverdue = task.isOverdue;
            })
        })  
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
