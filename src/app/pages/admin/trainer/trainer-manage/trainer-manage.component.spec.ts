import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerManageComponent } from './trainer-manage.component';

describe('TrainerManageComponent', () => {
  let component: TrainerManageComponent;
  let fixture: ComponentFixture<TrainerManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
