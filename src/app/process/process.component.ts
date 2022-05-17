import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelsService } from '../labels.service';
import { SyncService } from '../sync.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
})
export class ProcessComponent implements OnInit {
  constructor(private labelService: LabelsService, private sync: SyncService) {
    this.labels = this.labelService.getLabels();
  }
  form: any;
  labels: any;
  currStep = 'delivery';
  ngOnInit(): void {
    this.sync.getCurrStep().subscribe((step) => {
      this.currStep = step;
    });
  }
}
