import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-trainer',
  templateUrl: './event-trainer.component.html',
  styleUrls: ['./event-trainer.component.scss']
})
export class EventTrainerComponent {
  @Input() public modeldata: any;

  constructor(
    public route: Router
  ) { }
}