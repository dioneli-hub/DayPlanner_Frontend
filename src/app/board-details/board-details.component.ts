import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BoardModel } from 'src/api-models/board.model';
import { TaskModel } from 'src/api-models/task.model';
import { UserModel } from 'src/api-models/user.model';
import { UserProvider } from 'src/providers/user.provider';
import { AuthenticationService } from 'src/services/authentication.service';
import { BoardsService } from 'src/services/boards.service';
import { TasksService } from 'src/services/tasks.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit{
  
  private destroy$ = new Subject<void>();

  currentUser: UserModel | null = null;
  currentBoard: BoardModel | null = null;
  currentBoardName: string = '';
  boardMembers: Array<UserModel> = [];
  tasks: Array<TaskModel> = [];
  boardId: number | null = null;
  email: string = ''
  isCreator: boolean = null;

  constructor(private usersService: UsersService,
              private tasksService: TasksService,
              private boardsService: BoardsService,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']).then();
    }

    


    this.route 
        .params
        .pipe(takeUntil(this.destroy$))
        .subscribe(params => {
          this.boardId = params['id'];
          this.boardsService.getBoardById(this.boardId)
            .subscribe(currentBoard => {
              this.currentBoard = currentBoard;
              this.currentBoardName = currentBoard.name;

              this.usersService
                .current()
                .subscribe(user => {
                  this.currentBoard.creatorId == user.id ? this.isCreator = true : this.isCreator = false;
                });
            });
          if (this.boardId) {
            this.usersService
              .getBoardMembers(this.boardId)
              .pipe(takeUntil(this.destroy$))
              .subscribe(boardMembers => {
                this.boardMembers = boardMembers;
              });
              this.tasksService
                .getBoardTasks(this.boardId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(tasks => {
                  this.tasks = tasks;
                });
              }
            });

            
          }


          addBoardMember(value) {
            this.usersService
           .addBoardMember(this.boardId, value.email)
           .pipe(takeUntil(this.destroy$))
           .subscribe(m => {
            this.boardMembers.push(m);
           });
       }

       onDeleteMember(member: UserModel){
        this.usersService.deleteBoardMember(this.currentBoard.id, member.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
        this.boardMembers = this.boardMembers.filter(x => x.id !== member.id);
       })
      }

      onDeleteTask(task: TaskModel){
        this.tasksService
          .deleteTask(task.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(()=>{
            this.tasks = this.tasks.filter(x => x.id !== task.id);
           
          })  
       }

       onCreateTask(task: TaskModel){
        this.tasks.push(task);
      }

      // onCompleteTask(task: TaskModel){
      //   this.tasks.push(task);
      // }

     

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
  }}          
        
