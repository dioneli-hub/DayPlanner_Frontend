import { ApplicationRef, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TaskModel } from 'src/api-models/task.model';
import { UserModel } from 'src/api-models/user.model';
import { TasksService } from 'src/services/tasks.service';
import { UsersService } from 'src/services/users.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  taskDate: Date;
  boardMembers: Array<UserModel> = undefined;
  performerId: number = null;
  boardId:number;
  currentUserId: number = null
  taskCreatorId: number = null;
  // isOverdue : boolean;

  @Input() 
  task: TaskModel | null = null;

  @Output()
  deleteTask = new EventEmitter<TaskModel>();

  @Output()
   completeTask = new EventEmitter<TaskModel>();

  constructor(
    private tasksService: TasksService,
    private usersService: UsersService
    ) {}
   


  ngOnInit(): void {
    this.dateFormat(this.task.dueDate)

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

  updatePerformer(){
        this.tasksService
      .UpdateTaskPerformer(this.task.id, this.performerId)
      .subscribe((task: TaskModel)=>{
        this.task.performer = task.performer;
        this.task.performerId = task.performerId;
      })
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
