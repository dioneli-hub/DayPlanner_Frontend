import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SidebarComponent } from './HomePage/sidebar/sidebar.component';
import { HomeContentComponent } from './HomePage/home-content/home-content.component';
import { TaskComponent } from './HomePage/task/task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './HomePage/board/board.component';
import { AddNewTaskModalComponent } from './HomePage/add-new-task-modal/add-new-task-modal.component';
import { FormsModule } from '@angular/forms';
import { AddNewBoardModalComponent } from './HomePage/add-new-board-modal/add-new-board-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        //UsersBoardsComponent,
        HomeContentComponent,
        //TodaysTasksComponent,
        //UsersWorkComponent,
        TaskComponent,
        BoardComponent,
        AddNewBoardModalComponent,
        
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        AddNewTaskModalComponent,
        CommonModule,
        HttpClientModule
    ]
})
export class AppModule { }
