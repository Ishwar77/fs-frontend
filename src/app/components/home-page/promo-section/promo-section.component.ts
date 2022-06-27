import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo-section',
  templateUrl: './promo-section.component.html',
  styleUrls: ['./promo-section.component.scss']
})
export class PromoSectionComponent implements OnInit {

  constructor(
    private router: Router,
    private cdref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  trainerNavigate() {
    this.router.navigate(['/trainer-register']);
    this.cdref.markForCheck();
  }

}