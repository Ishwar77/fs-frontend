import { Component, OnInit, ChangeDetectorRef, Input, EventEmitter, Output } from "@angular/core";
import { EventService } from "src/app/services/event";
import { Router } from "@angular/router";
import { PageStatus, PageAction, PageManager } from "src/app/models/page";

export enum EventsListOrientation {
  /** To show cards in one row */
  INLINE = "inline",

  /** To show cards in multiple rows */
  BLOCK = "block",
}

@Component({
  selector: "app-event-cards",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.scss"],
})
export class EventCardComponent implements OnInit {
  @Output() cardClicked: EventEmitter<any> = new EventEmitter<any>();

  @Input() public amount:any;
  // @Input() public days:any;
  // @Input() public tax:any;

  constructor(
  ) {}

  ngOnInit() {
  }
  cardclicked(data) {
    this.cardClicked.emit(data);
  }
}
