import { Component, OnInit } from '@angular/core';
import { TipData } from 'src/models/tipData';
import { WaterUsageService } from 'src/services/WaterUsage.service';

@Component({
  selector: 'app-todays-water-usage',
  templateUrl: './todays-water-usage.component.html',
  styleUrls: ['./todays-water-usage.component.css']
})
export class TodaysWaterUsageComponent implements OnInit {
  outputData?: TipData;

  constructor(
    ) { }

  ngOnInit(): void {
  }

  sendDataToTip(tipData: TipData) {
    this.outputData = tipData;
  }
}
