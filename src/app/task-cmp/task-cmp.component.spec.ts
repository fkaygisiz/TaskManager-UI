import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCmpComponent } from './task-cmp.component';

describe('TaskCmpComponent', () => {
  let component: TaskCmpComponent;
  let fixture: ComponentFixture<TaskCmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
