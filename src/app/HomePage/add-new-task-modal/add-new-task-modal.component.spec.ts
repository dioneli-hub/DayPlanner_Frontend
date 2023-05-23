import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTaskModalComponent } from './add-new-task-modal.component';

describe('AddNewTaskModalComponent', () => {
  let component: AddNewTaskModalComponent;
  let fixture: ComponentFixture<AddNewTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
