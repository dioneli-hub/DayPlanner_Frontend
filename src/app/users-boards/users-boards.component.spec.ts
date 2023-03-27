import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBoardsComponent } from './users-boards.component';

describe('UsersBoardsComponent', () => {
  let component: UsersBoardsComponent;
  let fixture: ComponentFixture<UsersBoardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersBoardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
