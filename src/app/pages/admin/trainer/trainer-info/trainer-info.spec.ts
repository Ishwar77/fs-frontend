import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerInfo } from './trainer-info';

describe('TrainerInfo', () => {

  let component: TrainerInfo;
  let fixture: ComponentFixture<TrainerInfo>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerInfo ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
