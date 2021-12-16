import { Component, OnInit } from '@angular/core';
import { TipData } from 'src/models/tipData';
import { WaterUsageService } from 'src/services/WaterUsage.service';

@Component({
  selector: 'app-todays-water-usage',
  templateUrl: './todays-water-usage.component.html',
  styleUrls: ['./todays-water-usage.component.css']
})
export class TodaysWaterUsageComponent implements OnInit {
  waterUsage: number = 100;
  outputData?: TipData;

  constructor(
    private waterUsageService: WaterUsageService,
    ) { }

  ngOnInit(): void {
    this.waterUsageService.getWaterUsage(1).subscribe((data) => { this.waterUsage = data.amount });
  }

  sendDataToTip(tipData: TipData) {
    this.outputData = tipData;
  }
}
