import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfo } from './user-info';

describe('OrderPlaceComponent', () => {

  let component: UserInfo;
  let fixture: ComponentFixture<UserInfo>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfo ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
