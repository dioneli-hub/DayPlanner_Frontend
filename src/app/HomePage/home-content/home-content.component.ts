import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { BoardModel } from 'src/api-models/board.model';
import { TaskModel } from 'src/api-models/task.model';
import { Subject } from 'rxjs';
import { UsersService } from 'src/services/users.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
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
                    });
                    this.tasksService
                    .getTodaysUserBoardsTasks(this.userId)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(tasks => {
                      this.todaysTasks = tasks;
                    });
        }
       )}

       onDeleteBoard(board: BoardModel){
        this.boardsService.deleteBoard(board.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
        this.boards = this.boards.filter(x => x.id !== board.id);
        this.tasks = this.tasks.filter(x => x.boardId !== board.id);
        this.todaysTasks = this.todaysTasks.filter(x => x.boardId !== board.id);
      });
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
  console.log("home component emitter, value:")
  console.log(value)
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

//  onCompleteTask(task: TaskModel){
//   console.log("on complete task in home")
//   this.tasksService
//     .completeTask(task.id)
//     .pipe(takeUntil(this.destroy$))
//     .subscribe(()=>{
//       console.log("on complete task in home")
//       //this.tasks = this.tasks.filter(x => x.id !== task.id);
//       //this.todaysTasks = this.todaysTasks.filter(x => x.id !== task.id);
//     })  
//  }
  
  onCreateBoard(board: BoardModel){
    this.boards.unshift(board);
  }

  onCreateTask(task: TaskModel){
    this.tasks.push(task);
    if(this.isToday(task.dueDate)){
      this.todaysTasks.push(task);
    }
  }
  isToday (date: Date) {  
    const now = new Date()
    const d = new Date(date) 
      return d.getUTCDate() === now.getUTCDate() &&
           d.getUTCMonth() === now.getUTCMonth() &&
           d.getUTCFullYear() === now.getUTCFullYear()
  }
  
      ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
      }

      
    }
      
  // ngOnInit(){
  //   this.fetchTasks();
  //   this.fetchBoards();
  //   this.fetchTodaysTasks();
  // }



  // // addTask(taskObj: string[]){
  // //   let [context, board, dueDateString] = taskObj
  // //   console.log('dueDateString: ', dueDateString)
  // //   this.tasks.push({
  // //     id: this.tasks.length+1,
  // //     context: context,
  // //     dueDate: dueDateString,
  // //     board: board

  // //   })
  // // }

  // private fetchTasks(){
  //   this.http.get<{[key: number]: TaskModel}>(`${environment.apiUrl}TaskItem`)
  //   .pipe(map((response)=>{
  //     const tasks = [];
  //     for(const key in response){
  //       if(response.hasOwnProperty(key)){
  //         tasks.push({...response[key]}) //, id: key
  //       }
          
  //     }
  //     return tasks;
  //   }))
  //   .subscribe((tasks)=>{
  //   console.log(tasks);
  //   this.tasks = tasks;
  // });
    
  // }

  // onTasksFetch(){
  //   this.fetchTasks();
  // }

  // private fetchBoards(){
  //   this.http.get<{[key: number]: BoardModel}>(`${environment.apiUrl}Board`)
  //   .pipe(map((response)=>{
  //     const boards = [];
  //     for(const key in response){
  //       if(response.hasOwnProperty(key)){
  //         boards.push({...response[key]}) //, id: key
  //       }
          
  //     }
  //     return boards;
  //   }))
  //   .subscribe((boards)=>{
  //   console.log(boards);
  //   this.boards = boards;
  // });
    
  // }

  // onTodaysTasksFetch(){
  //   this.fetchTodaysTasks();
  // }

  // private fetchTodaysTasks(){
  //   this.http.get<{[key: number]: TaskModel}>(`${environment.apiUrl}TaskItem/todaystasks`)
  //   .pipe(map((response)=>{
  //     const todaysTasks = [];
  //     for(const key in response){
  //       if(response.hasOwnProperty(key)){
  //         todaysTasks.push({...response[key]}) //, id: key
  //       }
          
  //     }
  //     return todaysTasks;
  //   }))
  //   .subscribe((todaysTasks)=>{
  //   console.log(todaysTasks);
  //   this.todaysTasks = todaysTasks;
  // });
    
  // }

  // onBoardsFetch(){
  //   this.fetchBoards();
  // }
  
  // tasks: Task[]=[
  //   {id: 1, context: "Eat a donut", dueDate:"27/03/2023", board: "Leisure"},
  //   {id: 2, context: "6000 steps", dueDate:"27/03/2023", board: "Sports"},
  //   {id: 3, context: "Do HW", dueDate:"29/03/2023", board: "Work"},
  //   {id: 4, context: "Go to a cafe", dueDate:"30/03/2023", board: "Leisure"},
  // ];

  // boards: Board[] = [
  //   {id:1, name: "Leisure", tasks: [
  //     {id: 1, context: "Eat a donut", dueDate:"27/03/2023", board: "Leisure"},
  //     {id: 4, context: "Go to a cafe", dueDate:"30/03/2023", board: "Leisure"},
  //   ]},

  //   {id:2, name: "Work", tasks: [
  //     {id: 3, context: "Do HW", dueDate:"29/03/2023", board: "Work"},
  //   ]},

  //   {id:3, name: "Sports", tasks: [
  //     {id: 2, context: "6000 steps", dueDate:"27/03/2023", board: "Sports"}
  //   ],},
  // ]
