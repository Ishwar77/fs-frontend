import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-all',
  templateUrl: './payment-all.component.html',
  styleUrls: ['./payment-all.component.scss']
})
export class PaymentAllComponent implements OnInit {
expanded ;
@Input() public paymentCard: any;
  constructor() { }

  ngOnInit() {
  }

}
