import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './HomePage/sidebar/sidebar.component';
import { UsersBoardsComponent } from './HomePage/users-boards/users-boards.component';
import { HomeContentComponent } from './HomePage/home-content/home-content.component';
import { TodaysTasksComponent } from './HomePage/todays-tasks/todays-tasks.component';
import { UsersWorkComponent } from './HomePage/users-work/users-work.component';
import { TaskComponent } from './task/task.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './board/board.component';
import { AddNewTaskModalComponent } from './HomePage/add-new-task-modal/add-new-task-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        UsersBoardsComponent,
        HomeContentComponent,
        TodaysTasksComponent,
        UsersWorkComponent,
        TaskComponent,
        BoardComponent,
        AddNewTaskModalComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        NgbModule,
        DatePickerComponent
    ]
})
export class AppModule { }
