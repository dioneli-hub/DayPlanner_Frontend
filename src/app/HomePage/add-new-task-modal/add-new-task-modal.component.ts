import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { BoardModel } from 'src/api-models/board.model';
import { Router } from '@angular/router';
import { BoardsService } from 'src/services/boards.service';
import { UsersService } from 'src/services/users.service';
import { TaskModel } from 'src/api-models/task.model';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { TasksService } from 'src/services/tasks.service';

@Component({
  selector: 'app-add-new-task-modal',
  templateUrl: './add-new-task-modal.component.html',
  standalone: true,
  imports: [NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, CommonModule],
  styleUrls: ['./add-new-task-modal.component.css']
})

export class AddNewTaskModalComponent implements OnInit {

  @Output()
  taskCreate = new EventEmitter<TaskModel>();

  @Input() boards: BoardModel[];
  @Input() buttonDisabled: boolean;

  taskText = null;
  taskDueDate = null;
  board = null;
  minDate = undefined;
  isSetPerformerChecked: boolean = false;

  constructor(private router: Router, 
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private usersService: UsersService,
    private config: NgbDatepickerConfig) { 

      
    //datepicker
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }


  submit(value) {
    if (this.isSetPerformerChecked){this.usersService.current()
      .subscribe(user => {
        this.boardsService.addTaskToBoard(value, user.id)
            .subscribe(task=>{
              this.taskCreate.emit(task);
        })})} 
    else {
      this.boardsService.addTaskToBoard(value)
            .subscribe(task=>{
              this.taskCreate.emit(task);
    })}}
    

  ngOnInit(): void {
  }
}
