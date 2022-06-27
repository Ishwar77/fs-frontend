import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponEditComponent } from './edit-coupon.component';


describe('CouponEditComponent', () => {
  let component: CouponEditComponent;
  let fixture: ComponentFixture<CouponEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});