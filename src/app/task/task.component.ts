import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskModel } from 'src/api-models/task.model';
import { UserModel } from 'src/api-models/user.model';
import { NotificationsService } from 'src/services/notifications.service';
import { TasksService } from 'src/services/tasks.service';
import { UsersService } from 'src/services/users.service';
import { HomeContentComponent } from '../HomePage/home-content/home-content.component';
import { FormControl, Validators } from '@angular/forms';


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
  isChild: boolean;

  recurrencePattern
  recurringTypes = ['Daily', 'Weekly', 'Monthly']
  selectedRecurringType
  popoverVisible = false;
  isRepeatRecurrenceActions: boolean = false;

  occurencesNumber: number = null;
  occurencesNumberInput = new FormControl(null, [Validators.required, Validators.min(0), Validators.max(20)]);
  


  @Input() 
  task: TaskModel | null = null;

  @Output() deleteTask = new EventEmitter<TaskModel>();
  @Output() addTaskRecurrence = new EventEmitter<any>();
  // @Output() completeTask = new EventEmitter<TaskModel>();
  @Output() dueDateUpdated = new EventEmitter<any>();

  constructor(
    private tasksService: TasksService,
    private usersService: UsersService,
    ) {

    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    }

    updateChangeRecurredChildren (){
      this.tasksService 
          .updateChangeRecurredChildren(this.task.id)
          .subscribe((updatedChangeRecurredChildren)=>{
            this.task.changeRecurredChildren = updatedChangeRecurredChildren;
            this.isRepeatRecurrenceActions = updatedChangeRecurredChildren;
          }) 
    }

    submitAddRecurrenceForm(value: any){

      this.addTaskRecurrence.emit({
        task: this.task, 
        recurringType: value.recurringType, 
        occurencesNumber: value.occurencesNumber
      });
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

        this.isRepeatRecurrenceActions = this.task.changeRecurredChildren;

        this.isChild = this.task.parentTaskId != 0? true :false;

  if(this.task.performerId != null && this.task.performer != null){
    this.performerId = this.task.performerId;
  }

  this.taskCreatorId = this.task.creatorId;
  this.usersService
    .current()
    .subscribe((currentUser)=>{
      this.currentUserId = currentUser.id;
    })

    if (new Date() > new Date(this.task.dueDate) && this.task.isCompleted == false){
      this.updateTaskOverdue();
    }
}

get ifTaskCompleted(){
  return this.task.isCompleted == true? true: false;
}

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
       : this.task.isOverdue? '#fadbdb' : '#fbfcb8'
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

    if(this.task.changeRecurredChildren == true){
      this.dueDateUpdated.emit(task.id);
    }
    
    this.updateTaskOverdue();
    
  })
}

  updateTaskOverdue(){
    this.tasksService
            .UpdateTaskOverdue(this.task.id)
            .subscribe((task: TaskModel)=>{
              this.task.isOverdue = task.isOverdue;
              this.task.isCompleted = task.isCompleted;
            })
  }
 
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

  toggleStatus(task: TaskModel){
    this.task.isCompleted == true? this.markAsToDo(task) : this.complete(task);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
