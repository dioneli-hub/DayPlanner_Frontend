import {  Component,  OnInit,} from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { BoardModel } from 'src/api-models/board.model';
import { TaskModel } from 'src/api-models/task.model';
import { Subject } from 'rxjs';
import { UsersService } from 'src/services/users.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/api-models/user.model';
import { TasksService } from 'src/services/tasks.service';
import { BoardsService } from 'src/services/boards.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit{
  private destroy$ = new Subject<void>();

  currentUser: UserModel | null = null;
  userId: number | null = null;
  tasks: Array<TaskModel> = [];
  todaysTasks: Array<TaskModel> = [];
  boards: Array<BoardModel> = [];


  constructor(private usersService: UsersService,
              private tasksService: TasksService,
              private boardsService: BoardsService,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']).then();
    }

    this.usersService
    .current()
    .subscribe(currentUser => {
      this.currentUser = currentUser;
      this.userId = currentUser.id;
      this.usersService
          .getBoards(this.userId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(boards => {
                    this.boards = boards;
                    }); 
                    this.tasksService
                    .getUserBoardsTasks(this.userId)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(tasks => {
                      this.tasks = tasks;
                      this.sortTasksByDate();
                    });
        }
       )
      }

       onDeleteBoard(board: BoardModel){
        this.boardsService.deleteBoard(board.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
        this.boards = this.boards.filter(x => x.id !== board.id);
        this.tasks = this.tasks.filter(x => x.boardId !== board.id);
        this.todaysTasks = this.todaysTasks.filter(x => x.boardId !== board.id);
      });
      }

 sortTasksByDate(){
  this.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
 }   

 onDeleteTask(task: TaskModel){
  this.tasksService
    .deleteTask(task.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(()=>{
      this.tasks = this.tasks.filter(x => x.id !== task.id);
      this.todaysTasks = this.todaysTasks.filter(x => x.id !== task.id);
    })  
 }

 onLeaveBoard(value: any){ //userId: number, boardId: number
  var userId = value.userId;
  var boardId = value.boardId;
  this.usersService.leaveBoard(userId, boardId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(()=>{
      this.boards = this.boards.filter(x => x.id !== boardId);
      this.tasksService
                    .getUserBoardsTasks(this.userId)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(tasks => {
                      this.tasks = tasks;
                    });
                    this.tasksService
                    .getTodaysUserBoardsTasks(this.userId)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(tasks => {
                      this.todaysTasks = tasks;
                    });
    })  
 }
  
  onCreateBoard(board: BoardModel){
    this.boards.unshift(board);
  }

  onCreateTask(task: TaskModel){
    this.tasks.push(task);
    this.sortTasksByDate()
    if(this.isToday(task.dueDate)){
      this.todaysTasks.push(task);
    }
  }

  onAddTaskRecurrence(data){
    this.tasksService
          .addRecurrence(data.task.id, data.recurringType, data.occurencesNumber)
          .subscribe(childTasks => {
            this.tasks = [...this.tasks, ...childTasks];
            this.sortTasksByDate();
          })
  }


  isToday (date: Date) {  
    const now = new Date()
    const d = new Date(date) 
    let isToday = d.getUTCDate() === now.getUTCDate() &&
                  d.getUTCMonth() === now.getUTCMonth() &&
                  d.getUTCFullYear() === now.getUTCFullYear();
    return isToday;
  }

  get noTodaysTasks(): boolean{
    return this.tasks.some(task => this.isToday(task.dueDate) == true)? false:true;
  }

  get noTodoTasks(): boolean {
    return this.tasks.some(task => task.isCompleted == false && task.isOverdue != true)? false:true;
  }

  get noDoneTasks(): boolean{
    return this.tasks.some(task => task.isCompleted == true)? false:true;
  }

  get noOverdueTasks(): boolean{
    return this.tasks.some(task => task.isOverdue == true)? false:true;
  }

  get showBoards():boolean{
    return this.boards.length > 0? true: false;
  }

      ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
      }
}
      