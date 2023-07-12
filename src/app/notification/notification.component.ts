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

  @Input() notification: NotificationModel | null = null;
  @Output() deleteNotification = new EventEmitter<NotificationModel>();

  delete(notification: NotificationModel) {
    console.log("delete emmited")
    this.deleteNotification.emit(notification);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
