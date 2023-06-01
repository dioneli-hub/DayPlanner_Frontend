import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BoardModel } from 'src/api-models/board.model';
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
  // user: UserModel | null = null;
  boardMembers: Array<UserModel> = [];
  // postText = '';
  // userId: number | null = null;
  // hasCurrentFollow = false;
  // users: Array<UserModel> = [];

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

    // this.usersService
    //   .getBoardMembers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(this.boardMembers => this.boardMembers = this.boardMembers);

  
  }
}
