import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationModel } from 'src/api-models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  private destroy$ = new Subject<void>();
  daysAgo: string = '';


  @Input() notification: NotificationModel | null = null;
  @Output() deleteNotification = new EventEmitter<NotificationModel>();

  ngOnInit() {
    this.daysAgo = this.setDaysAgo();
  }
  delete(notification: NotificationModel) {
    this.deleteNotification.emit(notification);
  }



  setDaysAgo(){

    let createdAt = new Date(this.notification.createdAt);
    console.log(createdAt)
    let now = new Date();
    let diff = Math.round((now.getTime() - createdAt.getTime())/ (1000 * 3600 * 24))
    
    if(diff<1){
      return 'Today'
    } else if(diff<2){
      return '1 day ago'
    } else {
      return diff.toString() + ' days ago'
    }
}

   ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}



