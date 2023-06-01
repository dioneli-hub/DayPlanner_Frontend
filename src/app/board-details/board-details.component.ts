import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BoardModel } from 'src/api-models/board.model';
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

  currentBoard: BoardModel | null = null;
  boardMembers: Array<UserModel> = [];
  tasks: Array<TaskModel> = [];
  boardId: number | null = null;

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
            .subscribe(currentBoard => this.currentBoard =currentBoard);
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
          }}