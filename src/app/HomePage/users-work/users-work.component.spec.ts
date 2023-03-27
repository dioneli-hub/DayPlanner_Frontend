import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersWorkComponent } from './users-work.component';

describe('UsersWorkComponent', () => {
  let component: UsersWorkComponent;
  let fixture: ComponentFixture<UsersWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
