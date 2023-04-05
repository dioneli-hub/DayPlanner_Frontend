import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBoardModalComponent } from './add-new-board-modal.component';

describe('AddNewBoardModalComponent', () => {
  let component: AddNewBoardModalComponent;
  let fixture: ComponentFixture<AddNewBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBoardModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
