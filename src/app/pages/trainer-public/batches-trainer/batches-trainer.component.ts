import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-batches-trainer',
  templateUrl: './batches-trainer.component.html',
  styleUrls: ['./batches-trainer.component.scss']
})
export class TrainerBatchesComponent {
  @Input() public modeldata: any;
}