import { InjectionToken, NgModule } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewBoardModalComponent } from './HomePage/add-new-board-modal/add-new-board-modal.component';
import { AuthenticationInterceptor } from 'src/interceptors/authentication.interceptor';
import { LoginComponent } from './login/login.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { MemberComponent } from './member/member.component';
import { HttpErrorInterceptor } from 'src/interceptors/error.interceptor';
import { AddNewTaskFromBoardModalComponent } from './add-new-task-from-board-modal/add-new-task-from-board-modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationsInfoComponent } from './notifications-info/notifications-info.component';
import { NotificationComponent } from './notification/notification.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoadingComponent } from './loading/loading.component';
import { ThemingService } from 'src/services/theming.service';
import { ThemeChangerComponent } from './theme-changer/theme-changer.component';
import { TaskGroupComponent } from './task-group/task-group.component';

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


// export const THEMING_SERVICE_TOKEN = new InjectionToken<ThemingService>('ThemingService');


  // определение маршрутов
const appRoutes: Routes =[
    { path: '', component: HomeContentComponent},
    { path: 'login', component: LoginComponent},
    { path: 'board-details/:id', component: BoardDetailsComponent, },
    { path: 'notifications', component: NotificationsInfoComponent, },
    { path: "forgot-password", component: ForgotPasswordComponent, },
    { path: "reset-password", component: ResetPasswordComponent, },   
    { path: "verify", component: VerifyEmailComponent, },
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
        NotificationsInfoComponent,
        NotificationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        VerifyEmailComponent,
        LoadingComponent,
        ThemeChangerComponent,
        TaskGroupComponent,
        // AddNewTaskFromBoardModalComponent
        
    ],
    providers: [
        AUTHENTICATION_INTERCEPTOR,
        ERROR_INTERCEPTOR,
        ThemingService
        // {
        //     provide: THEMING_SERVICE_TOKEN, 
        //     useClass: ThemingService,
        //     multi: true
        // }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        AddNewTaskModalComponent,
        AddNewTaskFromBoardModalComponent,
        CommonModule,
        HttpClientModule
    ]
})
export class AppModule { }
