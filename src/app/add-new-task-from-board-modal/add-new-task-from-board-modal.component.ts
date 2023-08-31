import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbDatepickerConfig, NgbDatepickerModule, NgbDateStruct, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { BoardModel } from 'src/api-models/board.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BoardsService } from 'src/services/boards.service';
import { UsersService } from 'src/services/users.service';
import { UserProvider } from 'src/providers/user.provider';
import { TaskModel } from 'src/api-models/task.model';


@Component({
  standalone: true,
  selector: 'app-add-new-task-from-board-modal',
  templateUrl: './add-new-task-from-board-modal.component.html',
  
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, CommonModule],
  styleUrls: ['./add-new-task-from-board-modal.component.css']
})
export class AddNewTaskFromBoardModalComponent {

  @Output()
  taskFromBoardCreate = new EventEmitter<TaskModel>();

  @Input() boardId: number;

  taskText = null;
  taskDueDate = null;
  minDate=undefined;

  constructor(private router: Router, 
    private boardsService: BoardsService) { 

      
      //datepicker
      const current = new Date();
      this.minDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate()
      }; }

  submit(value) {
  this.boardsService.addTaskFromBoard(this.boardId, value)
    .subscribe(task=>{
      this.taskFromBoardCreate.emit(task);
  });
  }
  ngOnInit(): void {

  }
 }

