import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NotificationModel } from 'src/api-models/notification.model';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationsService } from 'src/services/notifications.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-notifications-info',
  templateUrl: './notifications-info.component.html',
  styleUrls: ['./notifications-info.component.css']
})
export class NotificationsInfoComponent {
  private destroy$ = new Subject<void>();
 
  notifications: Array<NotificationModel> = [];

  constructor(private usersService: UsersService,
              // private tasksService: TasksService,
              // private boardsService: BoardsService,
              private authService: AuthenticationService,
              private router: Router,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']).then();
    }

    this.notificationsService.getUserNotifications()
      .subscribe((notifications)=>{
        this.notifications = notifications;
      })
}

onDeleteNotification(notification: NotificationModel){
  console.log("on delete notification")
  this.notificationsService
    .deleteNotification(notification.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(()=>{
      this.notifications = this.notifications.filter(x => x.id !== notification.id);
    })  
 }


      //     addBoardMember(value) {
      //       this.usersService
      //      .addBoardMember(this.boardId, value.email)
      //      .pipe(takeUntil(this.destroy$))
      //      .subscribe(m => {
      //       this.boardMembers.push(m);
      //      });
      //  }

      //  onDeleteMember(member: UserModel){
      //   this.usersService.deleteBoardMember(this.currentBoard.id, member.id)
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe(() => {
      //   this.boardMembers = this.boardMembers.filter(x => x.id !== member.id);
      //  })
      // }

      // onLeaveBoard(user: UserModel){
      //   this.usersService
      //   .leaveBoard(user.id, this.currentBoard.id)
      //   .pipe(takeUntil(this.destroy$))
      //   .subscribe(() => {
      //   this.router.navigate(['/']).then();
      //  })
      // }

      // onDeleteTask(task: TaskModel){
      //   this.tasksService
      //     .deleteTask(task.id)
      //     .pipe(takeUntil(this.destroy$))
      //     .subscribe(()=>{
      //       this.tasks = this.tasks.filter(x => x.id !== task.id);
           
      //     })  
      //  }

      //  onCreateTask(task: TaskModel){
      //   this.tasks.push(task);
      // }

      // onCompleteTask(task: TaskModel){
      //   this.tasks.push(task);
      // }

     

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
  }}          

