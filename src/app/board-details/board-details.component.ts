import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BoardModel } from 'src/api-models/board.model';
import { ServiceResponse } from 'src/api-models/service-response.model';
import { TaskModel } from 'src/api-models/task.model';
import { UserModel } from 'src/api-models/user.model';
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
  @Output() leaveBoard = new EventEmitter<BoardModel>();


  // currentUser: UserModel | null = null;
  currentBoard: BoardModel | null = null;
  currentBoardName: string = '';
  boardMembers: Array<UserModel> = [];
  tasks: Array<TaskModel> = [];
  boardId: number | null = null;
  email: string = '';
  isCreator: boolean = null;
  searchOptions: Array<string> = []
  searchedEmail: string = ''
  showModalErrorToast: boolean = false;
  modalErrorToastText: string = '';
  isMembersListVisible: boolean = true;




  delete(board: BoardModel) {
    this.boardsService.deleteBoard(board.id).subscribe(()=>{
      this.router.navigate(['/']).then();
    })
  }

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
                  this.isCreator = currentBoard.creatorId == user.id? 
                     true :  false;

                  }

                );
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
                  this.sortTasksByDate();
                });
              }
            });

          }

          sortTasksByDate(){
            this.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
           }   

          loadSearchOptions(){
            if(this.searchedEmail.length > 0){
              this.usersService.getSuggestedSearchUsers(this.searchedEmail)
              .subscribe(users =>{
                this.searchOptions = users;
              })
            }
          }

          addBoardMember(value) {

            this.usersService
           .addBoardMember(this.boardId, value.email)
           .pipe(takeUntil(this.destroy$))
           .subscribe((memberResponse: ServiceResponse<UserModel>) => {
            if (memberResponse.isSuccess == true){
              this.showModalErrorToast = false;
              this.boardMembers.push(memberResponse.data);
            } else {
              this.showModalErrorToast = true;
              this.modalErrorToastText = memberResponse.message;
              setTimeout(()=> this.showModalErrorToast = false, 7000);
            }
            
          })
        }
       

       removeModalErrorToast(){
        this.showModalErrorToast = false;
       }

       onDeleteMember(member: UserModel){
        this.usersService.deleteBoardMember(this.currentBoard.id, member.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
        this.boardMembers = this.boardMembers.filter(x => x.id !== member.id);
       })
      }

      onLeaveBoard(user: UserModel){
        this.usersService
        .leaveBoard(user.id, this.currentBoard.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
        this.router.navigate(['/']).then();
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
        this.sortTasksByDate();
      }

      get noBoardTasks() : boolean{
        return this.tasks.length > 0? false: true;
      }

      get getColumnStyle(){
        if(this.isMembersListVisible == false){
          return {
            'display' : 'grid',
            'grid-template-columns': 'repeat(3, 1fr)',
          }
        };
        return {
          'display': 'grid',
          'grid-template-columns': '1fr'
      }
      }

      get toggleMembersIcon(){
        return this.isMembersListVisible == false? "fa fa-plus-square" : "fa fa-minus-square";
      }

      toggleMembers(){
        this.isMembersListVisible = !this.isMembersListVisible;
      }

      // onCompleteTask(task: TaskModel){
      //   this.tasks.push(task);
      // }

     

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
  }}          
        
