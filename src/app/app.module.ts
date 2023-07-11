import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeContentComponent } from './HomePage/home-content/home-content.component';
import { TaskComponent } from './task/task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './board/board.component';
import { AddNewTaskModalComponent } from './HomePage/add-new-task-modal/add-new-task-modal.component';
import { FormsModule } from '@angular/forms';
import { AddNewBoardModalComponent } from './HomePage/add-new-board-modal/add-new-board-modal.component';
import { AuthenticationInterceptor } from 'src/interceptors/authentication.interceptor';
import { LoginComponent } from './login/login.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { MemberComponent } from './member/member.component';
import { HttpErrorInterceptor } from 'src/interceptors/error.interceptor';
import { AddNewTaskFromBoardModalComponent } from './add-new-task-from-board-modal/add-new-task-from-board-modal.component';
import { NotFoundComponent } from './not-found/not-found.component';

const AUTHENTICATION_INTERCEPTOR = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  };

const ERROR_INTERCEPTOR = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  };

  // определение маршрутов
const appRoutes: Routes =[
    { path: '', component: HomeContentComponent},
    { path: 'login', component: LoginComponent},
    { path: 'board-details/:id', component: BoardDetailsComponent, },
    { path: "**", component: NotFoundComponent, }
];
@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        HomeContentComponent,
        TaskComponent,
        BoardComponent,
        AddNewBoardModalComponent,
        LoginComponent,
        BoardDetailsComponent,
        MemberComponent,
        NotFoundComponent,
        // AddNewTaskFromBoardModalComponent
        
    ],
    providers: [
        AUTHENTICATION_INTERCEPTOR,
        ERROR_INTERCEPTOR
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        NgbModule,
        FormsModule,
        AddNewTaskModalComponent,
        AddNewTaskFromBoardModalComponent,
        CommonModule,
        HttpClientModule
    ]
})
export class AppModule { }
